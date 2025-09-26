// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::time::{SystemTime, UNIX_EPOCH};
use tauri_plugin_sql::{Migration, MigrationKind};

#[tauri::command]
fn greet() -> String {
  let now = SystemTime::now();
  let epoch_ms = now.duration_since(UNIX_EPOCH).unwrap().as_millis();
  format!("Hello world from Rust! Current epoch: {epoch_ms}")
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  let migrations = vec![
    Migration {
      version: 1,
      description: "create initial tables",
      sql: include_str!("../migrations/202509180001_init.sql"),
      kind: MigrationKind::Up,
    },
    Migration {
      version: 2,
      description: "add types data",
      sql: include_str!("../migrations/202509180002_types.sql"),
      kind: MigrationKind::Up,
    },
    Migration {
      version: 3,
      description: "add test accounts data",
      sql: include_str!("../migrations/202509180003_test_data_accounts.sql"),
      kind: MigrationKind::Up,
    },
    Migration {
      version: 4,
      description: "add test transactions data",
      sql: include_str!("../migrations/202509180004_test_data_transactions.sql"),
      kind: MigrationKind::Up,
    },
    Migration {
      version: 5,
      description: "add test postings data",
      sql: include_str!("../migrations/202509180005_test_data_postings.sql"),
      kind: MigrationKind::Up,
    },
    Migration {
      version: 6,
      description: "update children account nodes on delete trigger",
      sql: include_str!("../migrations/202509260006_update_children_delete_trigger.sql"),
      kind: MigrationKind::Up,
    },
  ];

  tauri::Builder::default()
    .plugin(tauri_plugin_fs::init())
    .plugin(
      tauri_plugin_sql::Builder::default()
        .add_migrations("sqlite:app.db", migrations)
        .build(),
    )
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![greet])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
