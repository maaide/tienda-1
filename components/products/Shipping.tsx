import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { City, ISell, Region } from '../../interfaces'

interface Props {
  setShipping: any
  sell: ISell
  setSell: any
}

export const Shipping: React.FC<Props> = ({ setShipping, sell, setSell }) => {

  const [regions, setRegions] = useState<Region[]>()
  const [citys, setCitys] = useState<City[]>()

    const requestRegions = async () => {
        const request = await axios.get('https://testservices.wschilexpress.com/georeference/api/v1.0/regions', {
          headers: {
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': '4ebbe4e737b54bfe94307bca9e36ac4d'
          }
        })
        setRegions(request.data.regions)
      }
    
      useEffect(() => {
        requestRegions()
      }, [])
    
      const regionChange = async (e: any) => {
        const region = regions?.find(region => region.regionName === e.target.value)
        const request = await axios.get(`https://testservices.wschilexpress.com/georeference/api/v1.0/coverage-areas?RegionCode=${region?.regionId}&type=0`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': '4ebbe4e737b54bfe94307bca9e36ac4d'
          }
        })
        setCitys(request.data.coverageAreas)
        setSell({ ...sell, region: e.target.value })
      }
    
      const cityChange = async (e: any) => {
        const city = citys?.find(city => city.countyName === e.target.value)
        const request = await axios.post('https://testservices.wschilexpress.com/rating/api/v1.0/rates/courier', {
          "originCountyCode": "QNOR",
          "destinationCountyCode": city?.countyCode,
          "package": {
              "weight": "1",
              "height": "10",
              "width": "10",
              "length": "2"
          },
          "productType": 3,
          "contentType": 1,
          "declaredWorth": "2333",
          "deliveryTime": 0
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': '512b6b0ff709426d82968a33be83b4a1'
          }
        })
        setShipping(request.data.data.courierServiceOptions)
        setSell({ ...sell, city: e.target.value })
      }

  return (
    <div className=''>
      <select className='border text-sm p-2 rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600 w-full mb-2' onChange={regionChange}>
        <option>Seleccionar Región</option>
        {
        regions !== undefined
          ? regions.map(region => <option key={region.regionId}>{region.regionName}</option>)
          : ''
        }
      </select>
      {
        citys !== undefined
        ? <select className='block border text-sm p-2 rounded focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-600 w-full mb-2' onChange={cityChange}>
          <option>Seleccionar Ciudad</option>
          {citys.map(city => <option key={city.countyCode}>{city.countyName}</option>)}
        </select>
        : ''
      }
    </div>
  )
}
