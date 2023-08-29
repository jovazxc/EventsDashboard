
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
    <div className='flex justify-center mt-4'>
      <div className='bg-palette4 container p-4 rounded'>

        <div className="flex justify-between items-center">
          <span className='font-bold text-lg '>
            Events
          </span>

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

        <div className='grid lg:grid-cols-3 md:grid-cols-2 gris-cols-1 gap-6 mt-10'>
           

          {eventsToRender.map((e, idx) => (
            <EventTile
              key={idx}
              name={`${e.name} | Visitors: ${e.attendants.length}`} 
              private={e.isPrivate} 
              imgSrc={e.imgSrc} 
              showEdit={isAdmin}
              onClickEdit={() => showEditor(idx, true)}
              onClickEvent={() => showEditor(idx, false) }
              date={e.date.format('MM-DD-YYYY')}
            />
          ))}

        </div>

      </div>
    </div>
  )
}
