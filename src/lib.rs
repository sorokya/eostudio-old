use wasm_bindgen::prelude::*;
use web_sys::console;

extern crate serde;

use std::io::{Cursor, Write};

use eo::data::{pubs::*, EOByte, EOInt};

// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn get_class_file(buf: &[EOByte]) -> JsValue {
    let mut ecf = ClassFile::new();
    let mut cursor: Cursor<Vec<EOByte>> = Cursor::new(Vec::new());
    cursor.write_all(buf).unwrap();
    ecf.read(&mut cursor).unwrap();

    JsValue::from_serde(&ecf).unwrap()
}

#[wasm_bindgen]
pub fn get_drop_file(buf: &[EOByte]) -> JsValue {
    let mut edf = DropFile::new();
    let mut cursor: Cursor<Vec<EOByte>> = Cursor::new(Vec::new());
    cursor.write_all(buf).unwrap();
    edf.read(&mut cursor).unwrap();

    JsValue::from_serde(&edf).unwrap()
}

#[wasm_bindgen]
pub fn get_inn_file(buf: &[EOByte]) -> JsValue {
    let mut eif = InnFile::new();
    let mut cursor: Cursor<Vec<EOByte>> = Cursor::new(Vec::new());
    cursor.write_all(buf).unwrap();
    eif.read(&mut cursor).unwrap();

    JsValue::from_serde(&eif).unwrap()
}

#[wasm_bindgen]
pub fn get_item_file(buf: &[EOByte]) -> JsValue {
    let mut eif = ItemFile::new();
    let mut cursor: Cursor<Vec<EOByte>> = Cursor::new(Vec::new());
    cursor.write_all(buf).unwrap();
    eif.read(&mut cursor).unwrap();

    JsValue::from_serde(&eif).unwrap()
}

#[wasm_bindgen]
pub fn get_npc_file(buf: &[EOByte]) -> JsValue {
    let mut enf = NPCFile::new();
    let mut cursor: Cursor<Vec<EOByte>> = Cursor::new(Vec::new());
    cursor.write_all(buf).unwrap();
    enf.read(&mut cursor).unwrap();

    JsValue::from_serde(&enf).unwrap()
}

#[wasm_bindgen]
pub fn get_shop_file(buf: &[EOByte]) -> JsValue {
    let mut esf = ShopFile::new();
    let mut cursor: Cursor<Vec<EOByte>> = Cursor::new(Vec::new());
    cursor.write_all(buf).unwrap();
    esf.read(&mut cursor).unwrap();

    JsValue::from_serde(&esf).unwrap()
}

#[wasm_bindgen]
pub fn get_spell_file(buf: &[EOByte]) -> JsValue {
    let mut esf = SpellFile::new();
    let mut cursor: Cursor<Vec<EOByte>> = Cursor::new(Vec::new());
    cursor.write_all(buf).unwrap();
    esf.read(&mut cursor).unwrap();

    JsValue::from_serde(&esf).unwrap()
}

#[wasm_bindgen]
pub fn get_master_file(buf: &[EOByte]) -> JsValue {
    let mut emf = MasterFile::new();
    let mut cursor: Cursor<Vec<EOByte>> = Cursor::new(Vec::new());
    cursor.write_all(buf).unwrap();
    emf.read(&mut cursor).unwrap();

    JsValue::from_serde(&emf).unwrap()
}

#[wasm_bindgen]
pub fn get_talk_file(buf: &[EOByte]) -> JsValue {
    let mut etf = TalkFile::new();
    let mut cursor: Cursor<Vec<EOByte>> = Cursor::new(Vec::new());
    cursor.write_all(buf).unwrap();
    etf.read(&mut cursor).unwrap();

    JsValue::from_serde(&etf).unwrap()
}
