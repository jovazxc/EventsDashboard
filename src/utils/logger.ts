export namespace Logger {
    
    export function log(err: string | Error, stack: string | null = null ) {

        let obj = localStorage.getItem('errors')
        let errors:any[] = obj ? JSON.parse(obj) : []
        
        let item = {
            message: '',
            name: '',
            date: new Date().toISOString(), 
            stack: ''
        }

        if(typeof err == "string") {
            item.message = err
        }
        else if(err instanceof Error) {
            item.name = err.name
            item.message = err.message
            item.stack = err.stack || ""
        }

        errors.push(item)
        localStorage.setItem('errors', JSON.stringify(errors))

        const logEnabled = localStorage.getItem("logEnabled")
        if(logEnabled) {
            alert(item.message)
        }
    }
    
}