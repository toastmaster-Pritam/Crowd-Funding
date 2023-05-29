import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x9590E5986B76284319A1e652888BD82A2BB55286');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({args:[
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image
      ]})

      console.log("Campaign created Successfully!", data)
    } catch (error) {
      console.log("Failure!!", error)
    }
  }

  

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);