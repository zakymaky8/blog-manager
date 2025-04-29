import React from 'react'
import SugestionCard from './SugestionCard'
import { TAuthor, TSuggestions } from '@/app/_lib/type'

type TProps = {
    suggestions: TSuggestions[],
    users: TAuthor[]
}

const Suggestions = ({ suggestions, users }: TProps) => {
  return (
    <ul className='flex flex-col gap-4 mb-20'>
        {
            suggestions.length > 0 ?
            suggestions.map(suggestion => {
                const user = users.find(user => user.users_id === suggestion.user_id)!
                return (
                    <SugestionCard user={user} suggestion={suggestion}  key={suggestion.suggns_id} />
                )
            }):
            <div className="ml-auto text-center flex flex-col  gap-4 p-10 text-black italic mb-32">
                <p className="text-center opacity-70 text-[14px]">No Suggestions yet!</p>
            </div>
        }
    </ul>
  )
}

export default Suggestions