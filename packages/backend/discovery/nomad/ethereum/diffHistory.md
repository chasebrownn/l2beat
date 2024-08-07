Generated with discovered.json: 0x243c4905605c67e17594201def2843b23f02a978

# Diff at Thu, 28 Mar 2024 10:25:05 GMT:

- author: Mateusz Radomski (<radomski.main@protonmail.com>)
- comparing to: main@dd32bb06b292cc8459fb09925454ee3a90f5c27e block: 18340273
- current block number: 19531994

## Description

Update discovery to include the multisig threshold.

## Config/verification related changes

Following changes come from updates made to the config file,
or/and contracts becoming verified, not from differences found during
discovery. Values are for block 18340273 (main branch discovery), not current.

```diff
    contract Governor (0x93277b8f5939975b9E6694d5Fd2837143afBf68A) {
    +++ description: None
      upgradeability.threshold:
+        "3 of 5 (60%)"
    }
```

```diff
    contract RecoveryManager (0xda2f881f7f4e9D2b9559F97c7670472A85C1986A) {
    +++ description: None
      upgradeability.threshold:
+        "2 of 3 (67%)"
    }
```

Generated with discovered.json: 0x6e13c45d5dd44f156af0a170d664ab078ff2c8e3

# Diff at Fri, 13 Oct 2023 07:04:17 GMT:

- author: Mateusz Radomski (<radomski.main@protonmail.com>)
- comparing to: main@28e18077472448efd6132e6ee714b582cc1ee80b

## Description

Newly created contracts are the result of rediscovering the `upgradeBeacon` address.

## Watched changes

```diff
+   Status: CREATED
    contract HomeUpgradeBeacon (0x063e871f8DB991CEAd34B557A00B157B360084cc) {
    }
```

```diff
+   Status: CREATED
    contract ReplicaUpgradeBeacon (0x0876dFe4AcAe0e1c0a43302716483f5752298b71) {
    }
```

```diff
+   Status: CREATED
    contract GovernanceUpgradeBeacon (0x67833a48b3F509d4252ac2c19cd604556eD6c981) {
    }
```

```diff
+   Status: CREATED
    contract BridgeUpgradeBeacon (0xB70588b1A51F847d13158ff18E9Cac861dF5Fb00) {
    }
```

# Diff at Mon, 09 Oct 2023 14:59:21 GMT:

- author: Luca Donno (<donnoh99@gmail.com>)
- comparing to: main@

## Description

Update discovery to include the multisig threshold.

## Watched changes

```diff
+   Status: CREATED
    contract ReplicaBeaconProxy (0x049b51e531Fd8f90da6d92EA83dC4125002F20EF) {
    }
```

```diff
+   Status: CREATED
    contract UpgradeBeaconProxy (0x0A6f564C5c9BeBD66F1595f1B51D1F3de6Ef3b79) {
    }
```

```diff
+   Status: CREATED
    contract GovernanceRouterBeaconProxy (0x3009C99D370B780304D2098196f1EBF779a4777a) {
    }
```

```diff
+   Status: CREATED
    contract BridgeRouterBeaconProxy (0x88A69B4E698A4B090DF6CF5Bd7B2D47325Ad30A3) {
    }
```

```diff
+   Status: CREATED
    contract UpdaterManager (0x9272C9d5fa902Ef3804EC81e0333Ae420D57f715) {
    }
```

```diff
+   Status: CREATED
    contract HomeBeaconProxy (0x92d3404a7E6c91455BbD81475Cd9fAd96ACFF4c8) {
    }
```

```diff
+   Status: CREATED
    contract Governor (0x93277b8f5939975b9E6694d5Fd2837143afBf68A) {
    }
```

```diff
+   Status: CREATED
    contract UpgradeBeaconProxy (0xa4B86BcbB18639D8e708d6163a0c734aFcDB770c) {
    }
```

```diff
+   Status: CREATED
    contract RecoveryManager (0xda2f881f7f4e9D2b9559F97c7670472A85C1986A) {
    }
```

```diff
+   Status: CREATED
    contract UpgradeBeaconController (0xdB378579c2Af11817EEA21474A39F95B5b9DfD7e) {
    }
```

```diff
+   Status: CREATED
    contract XAppConnectionManager (0xFe8874778f946Ac2990A29eba3CFd50760593B2F) {
    }
```
