import { Avatar, Box, Paper } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../../App"
import { Image, ListAlt, Person } from "@mui/icons-material"
import { Outlet, useLocation, } from "react-router"
import { Link } from "react-router-dom"
import clsx from 'clsx';
import { removeSymbol } from "../../lib/utils/helper"
import Register from "../register"
import UpdateProfile from "../../modules/pages/ProfileComponents/UpdateProfile"
import { useTranslation } from "react-i18next"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UserContext from "../../lib/context/UserContext"
import AvatarProfile from "../../modules/pages/ProfileComponents/AvatarProfile"
const Profile = () => {
    // const [user] = useContext(userContext)
    const {user} = useContext(UserContext);

    const location = useLocation()
    const {t, tReady} = useTranslation(['profile'])
    const userProfile = [{
        id: 'profile',
        pathName: '/profile',
        itemTitle: t('profile'),
        itemIcon: <Person/>
    },{
        id: 'address-info',
        pathName: '/profile/address-info',
        itemTitle: t('addressInfo'),
        itemIcon: <LocationOnIcon/>
    },{
        id: 'booking-list',
        pathName: '/profile/examinations',
        itemTitle: t('bookingList'),
        itemIcon: <ListAlt/>
    }]

    const [flag, setFlag] = useState(false)
    const handleChangeFlag = () => setFlag(!flag)

    useEffect(()=> {}, [flag])

    const itemsNavigate = (itemID, pathName, itemTitle, itemIcon) => {
        return (
            <Link key={itemID} to={pathName}>
                <Box className={clsx("ou-flex ou-items-center ou-p-3", {'!ou-bg-blue-700 ou-rounded !ou-text-white'
                : removeSymbol('/', pathName) === removeSymbol('/', location.pathname) })}>
                    {itemIcon}
                    <span className="ou-ml-2">{itemTitle}</span>
                </Box>
            </Link>
        )
    }


    return (
        <>
        <Box className="ou-flex !ou-py-8 ou-justify-center">
            <Box  className=" ou-w-[30%]" >
                <AvatarProfile/>
                <Box  component={Paper} elevation={4} className="ou-p-5 ou-mt-6 ">
                    {userProfile.map((items) => itemsNavigate(items.id, items.pathName, items.itemTitle, items.itemIcon))}
                </Box>
            </Box>


           <Box className="ou-w-[70%] ou-ml-3" component={Paper} elevation={4}>
               { removeSymbol('/',location.pathname) === 'profile' ? 
                   <Box>
                        <Box>

                            <UpdateProfile userID={user.id} dob={user.date_of_birth} gender={parseInt(user.gender)} email={user.email}
                            firstName={user.first_name} lastName={user.last_name} phoneNumber={user.phone_number} handleOnSuccess={handleChangeFlag}/>
                        
                        </Box>
                    
                    </Box>
                : <Outlet/>
                }
           </Box>
        </Box>
         
        </>
    )
}

export default Profile

