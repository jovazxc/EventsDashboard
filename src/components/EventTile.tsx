import {  useAuthenticator } from "@aws-amplify/ui-react";
import { PropsWithChildren } from "react";
import Badge from "./Badge";
import Button from "./Button";


interface EventTileProps {
    private: boolean;
    name: string;
    showEdit: boolean;
    imgSrc: string;
    date: string;
    onClickEdit?(): any;
    onClickEvent?(): any;
}


function EventTile(props: EventTileProps) {

    const badgeColor = props.private ? 'red' : 'blue'
    const badgeText = props.private ? 'Private' : 'Public'


    return (
      <div className="flex p-2 bg-white rounded flex-col" >
        <div className='flex flex-1 justify-between items-center'>
        <Badge color={badgeColor}>{badgeText}</Badge>
          <span>
            
            {props.name}
          </span>

          <div className="flex space-x-1 flex-row items-center">
            { props.showEdit && <Button 
              color='blue'
              onClick={props.onClickEdit}
              >
                Edit
              </Button>
            }
            
          </div>
        </div>
  
        <div className='flex flex-1 items-center gap-x-6 mt-2 flex-col '>
          <img src={props.imgSrc} className="w-full h-24 cursor-pointer" onClick={props.onClickEvent}></img>

          {props.date}
        </div>
      </div>
    )
}

export default EventTile