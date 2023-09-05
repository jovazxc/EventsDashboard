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

    return (
      <div style={{flex: '0 0 30%'}} className="w-[500px] flex-grow-0 bg-palette1 rounded-md flex-col" >
        <img src={props.imgSrc} className="h-36 cursor-pointer rounded-t-md" onClick={props.onClickEvent}></img>

        <div className="p-2 ">
          <div className="flex justify-between">
            <span className="text-white">{props.private ? "Private" : "Public"} event</span>
            { props.showEdit && <Button 
                color='blue'
                onClick={props.onClickEdit}
                >
                  Edit
                </Button>
              }
          </div>
          <span className="text-palette3">{props.name}</span>
        </div>

      </div>
    )
}

export default EventTile