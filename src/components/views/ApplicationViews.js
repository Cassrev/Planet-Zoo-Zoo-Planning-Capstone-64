import { LocalViews } from "./LocalView"

export const ApplicationViews = () => {

    const localPzUser = localStorage.getItem("sitePZ_user")  // Retrieving the value of "honey_user" from the localStorage
    const siteUserObject = JSON.parse(localPzUser)        // Parsing the retrieved value as a JSON object

    if (siteUserObject) {
        // If the "staff" property of the honeyUserObject is true (indicating an employee)
        // Return the EmployeeViews component
        return <LocalViews />
    }
}
