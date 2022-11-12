import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper } from '@mui/material';



const AddSet = ({ Id }) => {

    const dispatch = useDispatch()
    return (
        <>
            {sets.amount.map((item, index) =>
                <TableCell align="center"  >
                    {item[0]?.index_id == 1 || item?.index_id == 1 ?
                        <InputAddKG /> :
                        item[0]?.index_id == 2 || item?.index_id == 2 ?
                            <InputAddDistance  /> :
                            item[0]?.index_id == 3 || item?.index_id == 3 ?
                                <InputAddREPS  /> :
                                item[0]?.index_id == 4 || item?.index_id == 4 ?
                                    <InputAddTime  /> : ''
                    }
                </TableCell>
            )}


        </>
    )
}

export default AddSet
