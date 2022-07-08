// material-ui
import { Breadcrumbs, Divider, Grid, Stack, Typography, Button, Box, TextField, MenuItem, Checkbox, FormControlLabel, IconButton, List } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { activeItem } from 'store/reducers/money';

// project import
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import ListIncomesCard from 'components/ListIncomesCard';
import { useState } from 'react';
import IncomeAreaChart from 'pages/dashboard/IncomeAreaChart';
// import MonthlyBarChart from 'pages/dashboard/MonthlyBarChart';
import { EyeOutlined } from '@ant-design/icons';


// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const Accounts = () => {
    const { periodicOperations, accounts, mainCurrency, currencies } = useSelector((state) => state.money.data);
    const periodicIncomes = periodicOperations.filter((perOper) => perOper.type === 'INCOME');
    const totalMonthlyIncome = periodicIncomes.reduce((sum, perInc) => sum + perInc.initialAmount, 0);


    const formatNum = (x) => {
        let numWith2DecimalsMax;
        if (x - Math.trunc(x) < 0.01) {
            numWith2DecimalsMax = Math.trunc(x);
        } else if ((Math.trunc(x * 10) / 10) === x) {
            numWith2DecimalsMax = (Math.floor(x * 100) / 100).toFixed(1);
        } else {
            numWith2DecimalsMax = (Math.floor(x * 100) / 100).toFixed(2);
        }
        return numWith2DecimalsMax.toString().replace(".", ",").replace(/\B(?<!\,\d*)(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <ComponentSkeleton>
            <Grid container rowSpacing={4.5} columnSpacing={2.75} >
                <Grid item xs={12} lg={6}>
                    <Stack spacing={3}>
                        <ListIncomesCard title={`Cuentas e inversiones`} codeHighlight>
                            <Stack spacing={2}>
                                {accounts?.map((intAcc, index) => (
                                    <div key={intAcc.creationDate}>
                                        {!!index && <Divider />}
                                        <Typography variant="h3">{intAcc.accountName}</Typography>
                                        <Breadcrumbs aria-label="breadcrumb">
                                            <Typography variant="h6">Moneda: {intAcc.currency}</Typography>
                                            <Typography variant="h6">TNA: {formatNum(intAcc.TNA * 100)}%</Typography>
                                            <Typography variant="h6">Plazo: {intAcc.termInDays} días</Typography>
                                            {!!intAcc.periodicAdd &&
                                                <Typography variant="h6">Agrego por plazo:
                                                    {intAcc.currency === mainCurrency
                                                        ? ` $${formatNum(intAcc.periodicAdd)}`
                                                        : ` ${formatNum(intAcc.periodicAdd)} ${intAcc.currency} ($${formatNum(intAcc.periodicAdd * currencies.find(c => c.name === intAcc.currency)?.actualValue)
                                                        })`}
                                                </Typography>
                                            }
                                        </Breadcrumbs>
                                    </div>
                                ))}
                            </Stack>
                        </ListIncomesCard>
                    </Stack>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Stack spacing={3}>
                        <ListIncomesCard title={`Ingresos Recurrentes Mensuales: $${totalMonthlyIncome}`} codeHighlight>
                            <Stack spacing={2}>
                                {periodicIncomes?.map((perInc, index) => (
                                    <div key={perInc.creationDate}>
                                        {!!index && <Divider />}
                                        <Typography variant="h3">{perInc.title}</Typography>
                                        <Breadcrumbs aria-label="breadcrumb">
                                            <Typography variant="h6">Cuenta: {perInc.accountName}</Typography>
                                            <Typography variant="h6">
                                                Monto: ${formatNum(perInc.initialAmount)} {perInc.currency}
                                            </Typography>
                                            <Typography variant="h6">Cada: {perInc.termInDays} días</Typography>
                                        </Breadcrumbs>
                                    </div>
                                ))}
                            </Stack>
                        </ListIncomesCard>
                    </Stack>
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
};

export default Accounts;
