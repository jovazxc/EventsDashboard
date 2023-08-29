import { Authenticator } from "@aws-amplify/ui-react";
import React from "react";
import ReactDOM from "react-dom/client";



export interface ModalProps<T> {
  exit(value: T | null): void;
}

async function renderComponent<T>(Component: React.ElementType, props={}) {
  return new Promise<T | null>(res => {
    
    const div = document.getElementById('portal')
    const root = ReactDOM.createRoot(div!)
  
    const exit = (result: T) => {
      root.unmount()
      res(result)
    }
  
    root.render(
      <Authenticator.Provider>
        <Component exit={exit} {...props} />
      </Authenticator.Provider>
    )
  })
}

export {
  renderComponent
};