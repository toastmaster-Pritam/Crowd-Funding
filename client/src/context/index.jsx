import React,{useContext,createContext} from "react";
import {useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react'
import {ethers} from 'ethers'

const StateContext=createContext();
export const StateContextProvider=({children})=>{
    const {contract} =useContract('0x9590E5986B76284319A1e652888BD82A2BB55286')
    const {mutateAsync: createCampaign}=useContractWrite(contract,'createCampaign')

    const address=useAddress()
    const connect=useMetamask()

    const publishCampaign = async (form)=>{
       try{
        const data=await createCampaign([
            address,
            form.title,
            form.description,
            form.target,
            new Date(form.deadline).getTime(),
            form.image
           
        ])
        console.log("Contract connected successfully with front end",data)

       }
       catch(err){
        console.log("failure",err)

       }
    }

    return (
        <StateContext.Provider value={{address,connect,contract,createCampaign:publishCampaign}}>
        {children}
        </StateContext.Provider>
    )

}
export const useStateContext=()=>useContext(StateContext)