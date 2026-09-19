import { createContext, useEffect, useState } from "react";



export const LocationContext = createContext(null);

export const LocationProvider = ({children})=>{
    const [location,setLocation] = useState(
        ()=>{
            const savedLocation = localStorage.getItem("foodstack_location")

            return savedLocation ? JSON.parse(savedLocation) : {
                latitude:null,
                longitude:null
            }
        }
    )

    useEffect(
        ()=>{
            localStorage.setItem("foodstack_location",JSON.stringify(location))
        },[location]
    )

    const useCurrentLocation = ()=>{
        return new Promise((resolve,reject)=>{
            if(!navigator.geolocation){
                return reject(
                    new Error("Geolocation is not supported")
                )
            }
            navigator.geolocation.getCurrentPosition(
                ({coords}) =>{
                    const value = {
                        latitude:coords.latitude,
                        longitude:coords.longitude
                    }
                    setLocation(value);
                    resolve(value);
                },
                reject
            )
        })
    }
    return (
        <LocationContext.Provider
        value={{
            location,setLocation,useCurrentLocation
        }}
        >
            {children}
        </LocationContext.Provider>
    )
}