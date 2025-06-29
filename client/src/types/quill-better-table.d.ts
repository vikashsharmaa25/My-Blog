declare module "quill-better-table" {
  import { Module } from "quill";

  class QuillBetterTable extends Module {
    static register(): void;
    static keyboardBindings: any;
  }

  export default QuillBetterTable;
}
