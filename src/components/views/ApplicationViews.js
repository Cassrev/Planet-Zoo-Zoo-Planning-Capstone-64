import { LocalViews } from "./LocalView"

export const ApplicationViews = () => {

    const localPzUser = localStorage.getItem("sitePZ_user")
    const siteUserObject = JSON.parse(localPzUser) 
    if (siteUserObject) {
        return <LocalViews />
    }
}
