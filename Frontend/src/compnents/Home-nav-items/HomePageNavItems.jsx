import React from 'react'
import CustomLink from '../CustomLink'

export default function HomePageNavItems() {
  return (
<>
    <CustomLink to="/add-member"> <h3>Add Member</h3></CustomLink>
    <CustomLink to="/delete-member"> <h3>Delete Member</h3></CustomLink>
</>
)
}



