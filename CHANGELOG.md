# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]
### Added


### Fixed


---

## [0.1.1] - 2025-10-08 

> Currency selection, basic user settings, bug fixes

### Added
- Account opening balances during creation
- Basic currency selection and default currency option
- User settings persistence through Tauri's `plugin-store`

### Fixed
- Negative zero liabilities in account summary
- Dynamic account dropdown filter in transactions page


## [0.1.0] - 2025-10-04

> Basic Functionalities

### Added
- Initial release of the Android app (Tauri + React).
- Double-entry accounting based finance tracking.
- Visually intuitive accounts through Emojis using [Fluent Emojis](https://github.com/microsoft/fluentui-emoji) .
- Account management: create, edit, and delete accounts.
- Transaction management: create, edit and delete transactions.
- Automatic balance and net worth for assets and liabilities.
- Local SQLite database integration.
- SWR data caching and revalidation.
- Form validation with Zod + React Hook Form.
- Shadcn-based UI for interactive and accessible components.****