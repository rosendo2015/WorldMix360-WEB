import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  disabled = false,
  placeholder = "Escreva a descrição completa do produto...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],

    content: value,

    editable: !disabled,

    editorProps: {
      attributes: {
        class:
          "min-h-[260px] w-full px-4 py-4 text-sm leading-7 text-gray-700 outline-none",
        "data-placeholder": placeholder,
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.setEditable(!disabled);
  }, [editor, disabled]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentHtml = editor.getHTML();

    if (value !== currentHtml && value !== "") {
      editor.commands.setContent(value, {
        emitUpdate: false,
      });
    }

    if (value === "" && !editor.isEmpty) {
      editor.commands.clearContent();
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-500">
        Carregando editor...
      </div>
    );
  }

  function setLink() {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt(
      "Informe a URL do link:",
      previousUrl || "https://",
    );

    if (url === null) {
      return;
    }

    if (url.trim() === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url.trim(),
        target: "_blank",
      })
      .run();
  }

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-300 bg-white ${
        disabled ? "opacity-60" : ""
      }`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
        {/* Parágrafo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("paragraph")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Parágrafo"
        >
          P
        </button>

        {/* Título 2 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-bold transition ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Título 2"
        >
          H2
        </button>

        {/* Título 3 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-bold transition ${
            editor.isActive("heading", { level: 3 })
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Título 3"
        >
          H3
        </button>

        <span className="mx-1 h-6 w-px bg-gray-300" />

        {/* Negrito */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-sm font-bold transition ${
            editor.isActive("bold")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Negrito"
        >
          B
        </button>

        {/* Itálico */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-sm italic transition ${
            editor.isActive("italic")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Itálico"
        >
          I
        </button>

        {/* Sublinhado */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-sm underline transition ${
            editor.isActive("underline")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Sublinhado"
        >
          U
        </button>

        <span className="mx-1 h-6 w-px bg-gray-300" />

        {/* Lista */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("bulletList")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Lista com marcadores"
        >
          • Lista
        </button>

        {/* Lista numerada */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("orderedList")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Lista numerada"
        >
          1. Lista
        </button>

        {/* Citação */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("blockquote")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Citação"
        >
          “ Citação
        </button>

        <span className="mx-1 h-6 w-px bg-gray-300" />

        {/* Link */}
        <button
          type="button"
          onClick={setLink}
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("link")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Adicionar link"
        >
          Link
        </button>

        {/* Remover link */}
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={disabled || !editor.isActive("link")}
          className="rounded px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          title="Remover link"
        >
          Remover link
        </button>

        <span className="mx-1 h-6 w-px bg-gray-300" />

        {/* Separador */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          disabled={disabled}
          className="rounded px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200"
          title="Separador"
        >
          ―
        </button>

        {/* Desfazer */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={disabled || !editor.can().undo()}
          className="rounded px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          title="Desfazer"
        >
          ↶
        </button>

        {/* Refazer */}
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={disabled || !editor.can().redo()}
          className="rounded px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          title="Refazer"
        >
          ↷
        </button>
      </div>

      {/* Área de edição */}
      <EditorContent editor={editor} />
    </div>
  );
}
