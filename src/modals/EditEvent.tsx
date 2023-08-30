import Button from "@/components/Button";
import { IEventInfo } from "@/pages";
import { ModalProps } from "@/utils/modal";
import dayjs from "dayjs";
import { useRef, useState } from "react";

interface EditEventModalProps extends ModalProps<IEventInfo> {
    event: IEventInfo,
    showEdit: boolean;
}

function EditEventModal({event, showEdit, ...props}: EditEventModalProps) {

    const [name, setName] = useState(event.name)
    const [date, setDate] = useState(event.date)
    const [isPrivate, setIsPrivate] = useState(event.isPrivate)
    const [attendants, setAttendants] = useState(event.attendants)
    const [imgSrc, setImgSrc] = useState(event.imgSrc)

    const inputRef = useRef<HTMLInputElement | null>(null)

    const cancel = () => {
        props.exit(null)
    }

    const save = () => {
        const ev:IEventInfo = {
            name,
            date,
            isPrivate,
            attendants,
            imgSrc
        }
        props.exit(ev);
    }

    const showFile = () => {
        if(inputRef.current != null) {
            inputRef.current.showPicker()
        }
    }

    const handleFileChange = () => {
        if(inputRef.current!.files!.length > 0) {
            const file = inputRef.current!.files![0]
            const fr = new FileReader()

            fr.onload = (event) => {
                const textLines = (event.target!.result as string).split('\n');

                const attendantsTmp = textLines.filter(l => l.length > 0).map(att => {
                    const data = att.split(',')
                    if(data.length != 3) return undefined
                    return {name: data[0], email: data[1], birthday: data[2]}
                })

                setAttendants(attendantsTmp)                
            }

            fr.readAsText(file)
        }
    }

    return (
        <div className="bg-[#000000AA] w-full h-full top-0 absolute z-50 flex justify-center items-center">
            <div className="bg-white container min-h-[50%] w-1/2 p-4 rounded flex flex-col justify-between">

                <span className="text-lg font-bold">
                    {showEdit ? "Editing" : "Details of"} {event.name}
                </span>
                <img src={imgSrc} className="w-full"/>
                    <div className="flex flex-col">
                        <div className="flex flex-col space-y-4">

                            <div>
                                <span className="font-600 block">Name:</span>
                                <input 
                                    className="rounded border-palette1 border px-1"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} 
                                    readOnly={!showEdit}
                                />
                            </div>

                            <div>
                                <span className="font-600 block">Date</span>
                                <input 
                                    className="rounded border-palette1 border px-1"
                                    value={dayjs(date).format('YYYY-MM-DD')} 
                                    type={"date"} 
                                    onChange={(e) => setDate(dayjs(e.target.value))}
                                    readOnly={!showEdit}
                                />
                            </div>
                          
                            <div>
                                <span className="font-600 block">SRC Img</span>
                                <input 
                                    className="rounded border-palette1 border px-1"
                                    value={imgSrc}
                                    onChange={(e) => setImgSrc(e.target.value)}
                                    readOnly={!showEdit}

                                />
                            </div>
                            <div className="space-x-2">
                                <label htmlFor="privacy" >Is Private?</label>
                                <input
                                    id="privacy"
                                    type="checkbox"
                                    checked={isPrivate} 
                                    onChange={e => setIsPrivate(e.target.checked)}
                                    readOnly={!showEdit}
                                />
                            </div>

                            <div className="flex justify-between">
                                <span className="text-base font-bold">
                                Attendants
                                </span>
                                {showEdit && (<Button color="blue" onClick={showFile}>
                                    Load CSV
                                </Button>)}
                            </div>

                            <input 
                                ref={inputRef} 
                                type="file" 
                                accept="text/csv" 
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            <div>

                                <table className="w-full">
                                    <thead>
                                        <tr>
                                        <th align="left">Name</th>
                                        <th align="left">Email</th>
                                        <th align="left">Birthday</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {attendants.map((att,idx) => <tr key={idx}>
                                            <td>{att.name}</td>
                                            <td>{att.email}</td>
                                            <td>{att.birthday}</td>
                                        </tr>)}
                                    </tbody>

                                </table>
                            </div>

                        </div>

                       

                    </div>

            
                    <div className="flex justify-end">
                        <Button onClick={cancel} > {showEdit ? "Cancel" : "Close"}</Button>
                        {showEdit && <Button onClick={save} color="blue">Save</Button>}
                    </div>
            </div>
        </div>
    )

}

export default EditEventModal;