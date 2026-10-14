import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { useRef, useEffect } from 'react'

const btn = (active) => ({
  padding: '4px 9px',
  margin: '1px',
  background: active ? '#1A3560' : '#fff',
  color: active ? '#fff' : '#333',
  border: '1px solid ' + (active ? '#1A3560' : '#d0d0d0'),
  borderRadius: '3px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 'bold',
  lineHeight: '1.5',
  transition: 'background 0.1s',
})

const Sep = () => (
  <span style={{ display: 'inline-block', width: '1px', background: '#d0d0d0', margin: '2px 5px', height: '20px', verticalAlign: 'middle' }} />
)

export default function HtmlEditor({ input }) {
  const prevValue = useRef(input.value)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
    ],
    content: input.value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      prevValue.current = html
      input.onChange(html)
    },
  })

  // Sync when switching between documents
  useEffect(() => {
    if (editor && input.value !== prevValue.current) {
      prevValue.current = input.value
      editor.commands.setContent(input.value || '', false)
    }
  }, [editor, input.value])

  if (!editor) return null

  const setLink = () => {
    const prev = editor.getAttributes('link').href || ''
    const url = window.prompt('URL du lien :', prev)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run()
    }
  }

  return (
    <div style={{ border: '1px solid #d0d0d0', borderRadius: '4px', overflow: 'hidden', fontFamily: 'sans-serif' }}>

      {/* ── Toolbar ── */}
      <div style={{ background: '#f5f5f5', borderBottom: '1px solid #d0d0d0', padding: '6px 8px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1px' }}>

        <button type="button" style={btn(false)} title="Annuler" onClick={() => editor.chain().focus().undo().run()}>↩</button>
        <button type="button" style={btn(false)} title="Refaire" onClick={() => editor.chain().focus().redo().run()}>↪</button>
        <Sep />

        <button type="button" style={btn(editor.isActive('heading', { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button type="button" style={btn(editor.isActive('heading', { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button type="button" style={btn(editor.isActive('heading', { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
        <Sep />

        <button type="button" style={{ ...btn(editor.isActive('bold')), fontWeight: 'bold' }} onClick={() => editor.chain().focus().toggleBold().run()} title="Gras">B</button>
        <button type="button" style={{ ...btn(editor.isActive('italic')), fontStyle: 'italic' }} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italique">I</button>
        <button type="button" style={{ ...btn(editor.isActive('underline')), textDecoration: 'underline' }} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Souligné">U</button>
        <button type="button" style={{ ...btn(editor.isActive('strike')), textDecoration: 'line-through' }} onClick={() => editor.chain().focus().toggleStrike().run()} title="Barré">S</button>
        <Sep />

        <button type="button" style={btn(editor.isActive({ textAlign: 'left' }))} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Gauche">⬅</button>
        <button type="button" style={btn(editor.isActive({ textAlign: 'center' }))} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Centrer">↔</button>
        <button type="button" style={btn(editor.isActive({ textAlign: 'right' }))} onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Droite">➡</button>
        <Sep />

        <button type="button" style={btn(editor.isActive('bulletList'))} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Liste à puces">• •</button>
        <button type="button" style={btn(editor.isActive('orderedList'))} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Liste numérotée">1.</button>
        <button type="button" style={btn(editor.isActive('blockquote'))} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Citation">❝</button>
        <Sep />

        <button type="button" style={btn(editor.isActive('link'))} onClick={setLink} title="Lien">🔗</button>
        <button type="button" style={{ ...btn(false), color: '#c00' }} onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} title="Effacer le formatage">✕</button>
      </div>

      {/* ── Content area ── */}
      <div style={{ padding: '12px 16px', minHeight: '220px', background: '#fff' }}>
        <style>{`
          .tiptap-body .ProseMirror { outline: none; font-size: 15px; line-height: 1.75; color: #222; }
          .tiptap-body .ProseMirror h1 { font-size: 1.9rem; font-weight: 700; margin: 1rem 0 .4rem; }
          .tiptap-body .ProseMirror h2 { font-size: 1.4rem; font-weight: 700; margin: .8rem 0 .3rem; }
          .tiptap-body .ProseMirror h3 { font-size: 1.15rem; font-weight: 600; margin: .6rem 0 .3rem; }
          .tiptap-body .ProseMirror p  { margin: .4rem 0; }
          .tiptap-body .ProseMirror ul { list-style: disc;    padding-left: 1.5rem; margin: .4rem 0; }
          .tiptap-body .ProseMirror ol { list-style: decimal; padding-left: 1.5rem; margin: .4rem 0; }
          .tiptap-body .ProseMirror blockquote { border-left: 3px solid #C9A84C; padding-left: 1rem; color: #555; margin: .5rem 0; }
          .tiptap-body .ProseMirror a  { color: #3C62AA; text-decoration: underline; }
          .tiptap-body .ProseMirror code { background: #f0f0f0; padding: 1px 4px; border-radius: 3px; font-family: monospace; font-size: .9em; }
          .tiptap-body .ProseMirror pre { background: #1a2236; color: #eee; padding: 1rem; border-radius: 4px; overflow: auto; font-family: monospace; }
          .tiptap-body .ProseMirror hr  { border: none; border-top: 2px solid #eee; margin: 1rem 0; }
          .tiptap-body .ProseMirror p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: #aaa; pointer-events: none; float: left; height: 0; }
        `}</style>
        <div className="tiptap-body">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}
