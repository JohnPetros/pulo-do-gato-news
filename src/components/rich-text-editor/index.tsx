'use client'

import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

import { Toolbar } from './toolbar'

const EXTENSIONS = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Underline
]

type Props = {
  errorMessage?: string
  onChange: (value: string) => void
}

export const RichTextEditor = ({ errorMessage, onChange }: Props) => {
  return (
    <div className='w-full'>
      <EditorProvider
        editorProps={{
          attributes: {
            class:
              'prose text-lg leading-[1.5rem] rounded-md w-full min-h-96 mx-auto mt-3 px-3 py-6 bg-gray-50 outline-none focus:ring focus:ring-gray-100',
          },
        }}
        slotBefore={<Toolbar />}
        slotAfter={errorMessage && <p className='mt-1 text-primary'>{errorMessage}</p>}
        autofocus={false}
        immediatelyRender={false}
        extensions={EXTENSIONS}
        onUpdate={({editor}) => onChange(editor.getText())}
      >
      </EditorProvider>
    </div>
  )
}
