import React, { type Dispatch, useState } from 'react'
import type { Fade } from 'types/json_types';
import useDebouncy from 'use-debouncy/lib/effect';
import type { FadeAction } from './main';

const FadeTimes = ({ fade, dispatch, i, sameFadeTimes }: { fade: Fade[number], dispatch: Dispatch<FadeAction>, i: number, sameFadeTimes: boolean }) => {
  const [duration, setDuration] = useState(fade[1]);
  const [fadeDuration, setFadeDuration] = useState(fade[2]);

  useDebouncy(() => {
    sameFadeTimes ? dispatch({ type: "sameFadeDuration", val: fadeDuration }) : dispatch({ type: "fadeDuration", val: fadeDuration, i: i })
  }, 200, [fadeDuration]);

  useDebouncy(() => {
    sameFadeTimes ? dispatch({ type: "sameDuration", val: duration }) : dispatch({ type: "duration", val: duration, i: i })
  }, 200, [duration]);

  return (
    <>
      <div className='w-full flex gap-2'>
        <div className='flex-grow'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
            <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={duration}
            onChange={e => setDuration(parseInt(e.target.value) || 0)} required />
        </div>
        <div className='flex-grow'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fade Duration</label>
            <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={fadeDuration}
            onChange={e => setFadeDuration(parseInt(e.target.value) || 0)} required />
        </div>
      </div>
    </>
  )
}

export default FadeTimes;