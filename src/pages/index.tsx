
import { useRouter } from 'next/router'
import { useAuthenticator } from '@aws-amplify/ui-react'
import Button from '@/components/Button'
import EventTile from '@/components/EventTile'
import { useState } from 'react'
import { renderComponent } from '@/utils/modal'
import EditEventModal from '@/modals/EditEvent'
import dayjs, { Dayjs } from 'dayjs'
import { Logger } from '@/utils/logger'

export interface IEventInfo {
  name: string;
  imgSrc: string;
  isPrivate: boolean;
  attendants: any[];
  date: Dayjs;
}

const eventsInfo: IEventInfo[]  = [
  {
    name: 'APP Experience',
    imgSrc: '/assets/image-21.png',
    isPrivate: true,
    attendants: [],
    date: dayjs()
  },
  {
    name: 'Southwest dental conference',
    imgSrc: '/assets/image-22.png',
    isPrivate: false,
    attendants: [],
    date: dayjs()
  },
  {
    name: 'WAC 2023 Istanbul',
    imgSrc: '/assets/image-23.png',
    isPrivate: false,
    attendants: [],
    date: dayjs()
  },
  {
    name: 'Courthouse Dogs',
    imgSrc: '/assets/image-24.png',
    isPrivate: true,
    attendants: [],
    date: dayjs()
  }
]

export default function Home() {

  const router = useRouter();
  const [events, setEvents] = useState(Array.from(eventsInfo))

  const { user, signOut: signOutAws} = useAuthenticator(context => [context.user,context.signOut])

  const logged = typeof user != "undefined"
  const isAdmin = logged && user.attributes?.['custom:role'] == "admin"
  
  const eventsToRender = isAdmin ? events : events.filter(e => e.isPrivate == false)

  const redirectLogin = () => {
    router.push("/login")
  }

  const signOut = () => {
    signOutAws()
    setTimeout(router.reload, 300)
  }

  const showEditor = async (index: number, showEdit: boolean) => {

    try{

      const event = events[index];
      const evModed = await renderComponent<IEventInfo>(EditEventModal, {event, showEdit});
      
      if(evModed != null) {
        const tmp = Array.from(events)
        tmp[index] = evModed;
        setEvents(tmp)
      }
    }
    catch(e) {
      const error = new Error("Something gone wrong")
      Logger.log(error)
    }
  }

  return (
    <div className='bg-black w-full h-full absolute flex flex-col'>

      <div className=' flex justify-between flex-row p-2'>
        <img
          className='w-32'
          src="https://matchboxvirtualmedia.com/wp-content/uploads/2021/10/matchbox-dark-logo-right-aligned-WHITE.png" 
        />

        <div className='flex space-x-2'>
          <span>
          Hello {user?.attributes?.name || "Guest"}
          </span>

          {logged ? <Button color="red" onClick={signOut}>
              Sign out
          </Button> :
          <Button color="blue" onClick={redirectLogin}>
            Sign in
          </Button>
          
        }
        </div>
      </div>

      <div className="flex justify-center ">

        <div className='w-1/2 flex justify-center flex-col'> 
          <span className=' font-bold text-white text-7xl'>
            Welcome to <span className='textGradient'>Admin Tools</span>
          </span>

          <p className='text-palette4 mt-2'>
            Start building virtual events quickly and easily! Below are some resources to inspire you and a community to support you.
          </p>

          <div className='flex mt-10 gap-2'>

            <div className="gradient px-6 py-2 text-white bold rounded">
              Solution Templates
            </div>

            <div className="bg-palette2 px-6 py-2 text-white bold rounded">
              Matchbox Kitchen
            </div>
          </div>
        </div>
      </div>

      <div className='p-4 mt-16 flex flex-nowrap items-start gap-2 bg-palette2 py-10 rounded gradient overflow-auto'>
            

        {eventsToRender.map((e, idx) => (
          <EventTile
            key={idx}
            name={e.name} 
            private={e.isPrivate} 
            imgSrc={e.imgSrc} 
            showEdit={true}
            onClickEdit={() => showEditor(idx, true)}
            onClickEvent={() => showEditor(idx, false) }
            date={e.date.format('MM-DD-YYYY')}
          />
        ))}


      </div>
    </div>
  )
}
