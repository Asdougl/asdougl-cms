import { forwardRef, useMemo } from 'react'
import { Listbox } from '../../components/Listbox'
import type { ListboxOption, ListboxProps } from '../../components/Listbox'

import { trpc } from '../../utils/trpc'

type AuthorListboxProps = Omit<ListboxProps, 'options'>

export const AuthorListbox = forwardRef<HTMLSelectElement, AuthorListboxProps>(
  function AuthorListbox(props, ref) {
    const { data } = trpc.useQuery(['author.getAuthors'])

    const options = useMemo(() => {
      if (data) {
        return data.map<ListboxOption>((author) => {
          return { text: author.name ?? author.id, value: author.id }
        })
      } else {
        return []
      }
    }, [data])

    return <Listbox options={options} ref={ref} {...props} />
  }
)
