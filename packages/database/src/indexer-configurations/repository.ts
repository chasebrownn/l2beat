import { PostgresDatabase, Transaction } from '../kysely'
import { batchExecute } from '../utils/batchExecute'
import { IndexerConfigurationRecord, toRecord, toRow } from './entity'
import { selectIndexerConfigurations } from './select'

export class IndexerConfigurationsRepository {
  constructor(private readonly db: PostgresDatabase) {}

  async addOrUpdateMany(record: IndexerConfigurationRecord[]) {
    const rows = record.map(toRow)

    await batchExecute(this.db, rows, 5_000, async (trx, batch) => {
      await trx
        .insertInto('public.indexer_configurations')
        .values(batch)
        .onConflict((cb) =>
          cb.column('id').doUpdateSet((eb) => ({
            id: eb.ref('excluded.id'),
            indexer_id: eb.ref('excluded.indexer_id'),
            properties: eb.ref('excluded.properties'),
            current_height: eb.ref('excluded.current_height'),
            min_height: eb.ref('excluded.min_height'),
            max_height: eb.ref('excluded.max_height'),
          })),
        )
        .execute()
    })
  }

  async getSavedConfigurations(indexerId: string) {
    const rows = await this.db
      .selectFrom('public.indexer_configurations')
      .select(selectIndexerConfigurations)
      .where('indexer_id', '=', indexerId)
      .execute()

    return rows.map(toRecord)
  }

  async getSavedConfigurationsByIds(configurationIds: string[]) {
    const rows = await this.db
      .selectFrom('public.indexer_configurations')
      .select(selectIndexerConfigurations)
      .where('id', 'in', configurationIds)
      .execute()

    return rows.map(toRecord)
  }

  updateConfigurationsCurrentHeight(
    indexerId: string,
    currentHeight: number | null,
    trx?: Transaction,
  ) {
    const scope = trx ?? this.db

    return scope
      .updateTable('public.indexer_configurations')
      .set('current_height', currentHeight)
      .where('indexer_id', '=', indexerId)
      .where('min_height', '<=', currentHeight)
      .where((eb) =>
        eb.or([
          eb('max_height', 'is', null),
          eb('max_height', '>=', currentHeight),
        ]),
      )
      .where((eb) =>
        eb.or([
          eb('current_height', 'is', null),
          eb('current_height', '<', currentHeight),
        ]),
      )
      .execute()
  }

  async deleteConfigurationsExcluding(
    indexerId: string,
    configurationIds: string[],
  ) {
    return await this.db
      .deleteFrom('public.indexer_configurations')
      .where('indexer_id', '=', indexerId)
      .where('id', 'not in', configurationIds)
      .execute()
  }

  async getAll() {
    const rows = await this.db
      .selectFrom('public.indexer_configurations')
      .select(selectIndexerConfigurations)
      .execute()

    return rows.map(toRecord)
  }

  deleteAll() {
    return this.db.deleteFrom('public.indexer_configurations').execute()
  }
}