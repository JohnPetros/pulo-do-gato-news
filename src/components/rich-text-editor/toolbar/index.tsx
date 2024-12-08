import { useCurrentEditor } from '@tiptap/react'
import { twMerge } from 'tailwind-merge'

import { BoldIcon } from './bold-icon'
import { StrikeThroughIcon } from './strike-through-icon'
import { ItalicIcon } from './italic-icon'
import { UnderlineIcon } from './underline-icon'
import { Heading1Icon } from './heading-1-icon'
import { Heading2Icon } from './heading-2-icon'
import { Heading3Icon } from './heading-3-icon'
import { Heading4Icon } from './heading-4-icon'
import { ListIcon } from './list-icon'
import { NumberedListIcon } from './numbered-list-icon'

const BUTTON_CLASS =
  'rounded-md grid place-content-center p-2 border border-geay-50 hover:opacity-75 duration-200 transition-opacity'

const ACTIVE_BUTTON_CLASS = 'text-primary bg-gray-50'

export const Toolbar = () => {
  const { editor } = useCurrentEditor()

  if (editor)
    return (
      <ul className='flex items-center gap-3 p-3 rounded-md border border-gray-100'>
        <li>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={twMerge(
              BUTTON_CLASS,
              editor.isActive('heading', { level: 1 }) && ACTIVE_BUTTON_CLASS,
            )}
          >
            <Heading1Icon />
          </button>
        </li>
        <li>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={twMerge(
              BUTTON_CLASS,
              editor.isActive('heading', { level: 2 }) && ACTIVE_BUTTON_CLASS,
            )}
          >
            <Heading2Icon />
          </button>
        </li>
        <li>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={twMerge(
              BUTTON_CLASS,
              editor.isActive('heading', { level: 3 }) && ACTIVE_BUTTON_CLASS,
            )}
          >
            <Heading3Icon />
          </button>
        </li>
        <li>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={twMerge(
              BUTTON_CLASS,
              editor.isActive('heading', { level: 4 }) && ACTIVE_BUTTON_CLASS,
            )}
          >
            <Heading4Icon />
          </button>
        </li>
        <li>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={twMerge(
              BUTTON_CLASS,
              editor.isActive('bold') && ACTIVE_BUTTON_CLASS,
            )}
          >
            <BoldIcon />
          </button>
        </li>
        <li>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={twMerge(
              BUTTON_CLASS,
              editor.isActive('italic') && ACTIVE_BUTTON_CLASS,
            )}
          >
            <ItalicIcon />
          </button>
        </li>
        <li>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={twMerge(
              BUTTON_CLASS,
              editor.isActive('undeline') && ACTIVE_BUTTON_CLASS,
            )}
          >
            <UnderlineIcon />
          </button>
        </li>
        <li>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={twMerge(
              BUTTON_CLASS,
              editor.isActive('strike') && ACTIVE_BUTTON_CLASS,
            )}
          >
            <StrikeThroughIcon />
          </button>
        </li>
        <li>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleList('bulletList', 'listItem').run()}
            className={twMerge(
              BUTTON_CLASS,
              editor.isActive('bulletList') && ACTIVE_BUTTON_CLASS,
            )}
          >
            <ListIcon />
          </button>
        </li>
        <li>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleList('orderedList', 'listItem').run()}
            className={twMerge(
              BUTTON_CLASS,
              editor.isActive('orderedList') && ACTIVE_BUTTON_CLASS,
            )}
          >
            <NumberedListIcon />
          </button>
        </li>
      </ul>
    )
}
