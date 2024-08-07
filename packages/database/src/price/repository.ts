import { UnixTime } from '@l2beat/shared-pure'
import { PostgresDatabase } from '../kysely'
import {
  CleanDateRange,
  deleteHourlyUntil,
  deleteSixHourlyUntil,
} from '../utils/deleteArchivedRecords'
import { Price, toRecord, toRow } from './entity'
import { selectPrice } from './select'

export class PriceRepository {
  constructor(private readonly db: PostgresDatabase) {}

  async getByConfigIdsInRange(
    configIds: string[],
    fromInclusive: UnixTime,
    toInclusive: UnixTime,
  ) {
    const rows = await this.db
      .selectFrom('public.prices')
      .select(selectPrice)
      .where((eb) =>
        eb.and([
          eb('configuration_id', 'in', configIds),
          eb('timestamp', '>=', fromInclusive.toDate()),
          eb('timestamp', '<=', toInclusive.toDate()),
        ]),
      )
      .orderBy('timestamp')
      .execute()

    return rows.map(toRecord)
  }

  async getByTimestamp(timestamp: UnixTime) {
    const rows = await this.db
      .selectFrom('public.prices')
      .select(selectPrice)
      .where((eb) => eb.and([eb('timestamp', '=', timestamp.toDate())]))
      .orderBy('timestamp')
      .execute()

    return rows.map(toRecord)
  }

  async findByConfigAndTimestamp(configId: string, timestamp: UnixTime) {
    const row = await this.db
      .selectFrom('public.prices')
      .select(selectPrice)
      .where((eb) =>
        eb.and([
          eb('configuration_id', '=', configId),
          eb('timestamp', '=', timestamp.toDate()),
        ]),
      )
      .executeTakeFirst()

    return row ? toRecord(row) : null
  }

  async addMany(records: Price[]) {
    if (records.length === 0) {
      return 0
    }

    const rows = records.map(toRow)

    await this.db.insertInto('public.prices').values(rows).execute()

    return rows.length
  }

  async deleteByConfigInTimeRange(
    configId: string,
    fromInclusive: UnixTime,
    toInclusive: UnixTime,
  ) {
    return this.db
      .deleteFrom('public.prices')
      .where((eb) =>
        eb.and([
          eb('configuration_id', '=', configId),
          eb('timestamp', '>=', fromInclusive.toDate()),
          eb('timestamp', '<=', toInclusive.toDate()),
        ]),
      )
      .execute()
  }

  deleteHourlyUntil(dateRange: CleanDateRange) {
    return deleteHourlyUntil(this.db, 'public.prices', dateRange)
  }

  deleteSixHourlyUntil(dateRange: CleanDateRange) {
    return deleteSixHourlyUntil(this.db, 'public.prices', dateRange)
  }
  async getAll() {
    const rows = await this.db.selectFrom('public.prices').selectAll().execute()

    return rows.map(toRecord)
  }

  deleteAll() {
    return this.db.deleteFrom('public.prices').execute()
  }
}
