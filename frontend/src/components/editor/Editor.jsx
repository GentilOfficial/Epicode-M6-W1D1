import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button, ButtonGroup } from 'react-bootstrap'
import './style.css'

import {
  ArrowClockwise,
  ArrowCounterclockwise,
  ListOl,
  ListUl,
  TypeBold,
  TypeH1,
  TypeH2,
  TypeItalic,
  TypeStrikethrough,
} from 'react-bootstrap-icons'

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<h1>Titolo</h1><p>Inizia a scrivere il tuo post...</p>',
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div>
      <ButtonGroup className="mb-2 flex-wrap">
        <Button
          variant={editor.isActive('bold') ? 'dark' : 'outline-dark'}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <TypeBold />
        </Button>

        <Button
          variant={editor.isActive('italic') ? 'dark' : 'outline-dark'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <TypeItalic />
        </Button>

        <Button
          variant={editor.isActive('strike') ? 'dark' : 'outline-dark'}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <TypeStrikethrough />
        </Button>

        <Button
          variant={editor.isActive('heading', { level: 1 }) ? 'dark' : 'outline-dark'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <TypeH1 />
        </Button>

        <Button
          variant={editor.isActive('heading', { level: 2 }) ? 'dark' : 'outline-dark'}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <TypeH2 />
        </Button>

        <Button
          variant={editor.isActive('bulletList') ? 'dark' : 'outline-dark'}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListUl />
        </Button>

        <Button
          variant={editor.isActive('orderedList') ? 'dark' : 'outline-dark'}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOl />
        </Button>

        <Button variant="outline-dark" onClick={() => editor.chain().focus().undo().run()}>
          <ArrowCounterclockwise />
        </Button>

        <Button variant="outline-dark" onClick={() => editor.chain().focus().redo().run()}>
          <ArrowClockwise />
        </Button>
      </ButtonGroup>

      <div className="editor-wrapper">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default Editor
