
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
// import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(3, 0),
    color: 'white',
    backgroundColor: '#E0A800'
}));

export default function DashboardCard(props) {
    return (
        <RootStyle>
            {/*<IconWrapperStyle>*/}
            {/*    {props.icon}*/}
            {/*</IconWrapperStyle>*/}
            {props.icon}
            <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
                {props.title}
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                {props.subTitle}
            </Typography>
        </RootStyle>
    );
}