# Change Log - @rnx-kit/typescript-service

This log was last generated on Tue, 13 Jul 2021 17:03:23 GMT and should not be manually modified.

<!-- Start content -->

## 1.1.0

Tue, 13 Jul 2021 17:03:23 GMT

### Minor changes

- Separate Project methods into "find" and "open", allowing caller to decide on the appropriate error-handling logic. Add filtering when validating Project files -- 0nly include ts[x] unless checkJs is enabled. Make cache methods return a true/false result, moving error-handling up and out to the caller (Project). Stop converting to lowercase during path normalization, as this confuses typescript. (afoxman@microsoft.com)

## 1.0.2

Thu, 08 Jul 2021 09:26:30 GMT

### Patches

- Add missing exports in typescript-service (afoxman@microsoft.com)

## 1.0.1

Wed, 23 Jun 2021 07:30:22 GMT

### Patches

- Add a new package for using TypeScript language services (afoxman@microsoft.com)
