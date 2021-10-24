import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
	Container,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	Typography,
	TableBody,
	Paper,
	Fab,
	AppBar,
	Toolbar,
	Link,
	IconButton,
    Stack,
} from '@mui/material';
import {
	CheckCircle,
	Cancel,
	Print,
	Facebook,
	Twitter,
	Instagram,
	YouTube,
	Pinterest,
	LinkedIn,
} from '@mui/icons-material';
import base64url from 'base64-url';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';

const PREFIX = 'Rendered';

const classes = {
    container: `${PREFIX}-container`,
    toolBar: `${PREFIX}-toolBar`,
    print: `${PREFIX}-print`,
    titles: `${PREFIX}-titles`,
    tableTitles: `${PREFIX}-tableTitles`,
    page: `${PREFIX}-page`,
    titleBar: `${PREFIX}-titleBar`,
    cell: `${PREFIX}-cell`,
    titleCell: `${PREFIX}-titleCell`,
    pageTitle: `${PREFIX}-pageTitle`,
    footerBar: `${PREFIX}-footerBar`,
	stack: `${PREFIX}-stack`,
};

const Root = styled('div')({
	[`& .${classes.container}`]: {
		minWidth: 920,
		maxWidth: 1800,
		marginBottom: 20,
		marginTop: 20
	},
	[`& .${classes.toolBar}`]: {
		margin: 'auto',
		width: 1200
	},
	[`& .${classes.print}`]: {
		color: '#000000',
		borderColor: '#000000',
		width: 202,
		height: 60,
		margin: 30
	},
	[`& .${classes.titles}`]: {
		fontWeight: 'bold',
		fontSize: 28,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex'
	},
	[`& .${classes.tableTitles}`]: {
		fontWeight: 'bold',
		fontSize: 28,
		alignItems: 'center',
		justifyContent: 'left',
		display: 'flex'
	},
	[`& .${classes.page}`]: {
		marginTop: 150,
		backgroundColor: '#ECF0F1',
		paddingTop: 5,
		paddingBottom: 5
	},
	[`& .${classes.titleBar}`]: {
		backgroundColor: '#ffffff',
		paddingTop: 10,
		paddingBottom: 10,
		position: 'fixed',
		height: 150,
		borderBottom: '6px solid #E5B634',
		justifyContent: 'space-between'
	},
	[`& .${classes.cell}`]: {
		borderBottom: 'none'
	},
	[`& .${classes.titleCell}`]: {
		borderColor: '#000000'
	},
	[`& .${classes.pageTitle}`]: {
		flexGrow: 1,
		color: '#000000',
		fontWeight: 'bold'
	},
	[`& .${classes.footerBar}`]: {
		backgroundColor: '#ffffff',
		paddingTop: 10,
		paddingBottom: 10,
		height: 150,
		top: 'auto',
		bottom: 0,
		borderTop: '6px solid #E5B634',
		minWidth: '100%'
	},
	[`& .${classes.stack}`]: {
		'padding': '45px 0'
	},
	[`& .${classes.print}`]: {
		position: 'fixed',
		bottom: 20,
		right: 20
	}
});

export async function getServerSideProps({ query }) {
    const { pkg, srv, adn, clc, g } = query;
	const packageData = JSON.parse(base64url.decode(pkg));
	const serviceData = JSON.parse(base64url.decode(srv));
	const addonData = JSON.parse(base64url.decode(adn));
	const calcData = JSON.parse(base64url.decode(clc));
	const goal = Number(base64url.decode(g));
	const total = calcData.reduce((acc, cur) => acc + Number(cur.profit), 0);
    
    return { props: { packageData, serviceData, addonData, calcData, goal, total } };
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

function format(number) {
    return formatter.format(number.toFixed(2));
}

const Rendered = (props) => {
	const router = useRouter();
    const { packageData, serviceData, addonData, calcData, goal, total } = props;

	const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'The Fearless Climb Package Designer',
        bodyClass: `${classes.titleBar} ${classes.page} ${classes.footerBar}`,
        onBeforeGetContent: () => document.getElementById('print-button').style.display = 'none',
        onAfterPrint: () => document.getElementById('print-button').style.display = 'block',
    });

	useEffect(() => {
		document.getElementById('print-button').click();
	});

    if (router.isFallback) {
        return ( <p>Loading...</p> );
    }

	return (
		<Root ref={componentRef}>
            <Head><title>The Fearless Climb Business Package Designer</title></Head>
            <Fab
                className={classes.print}
                variant='extended'
                size='large'
                onClick={handlePrint}
                id='print-button'
            >
                <Print style={{ marginRight: 5 }} />
                Save/Print
            </Fab>

            {/* Header */}
            <AppBar className={classes.titleBar} fullWidth elevation={0}>
                <Toolbar className={classes.toolBar}>
                    <Image src='/logo.png' alt='logo' width={262} height={120} />
                    <Typography variant='h4' className={classes.pageTitle} align='center'>BUSINESS PACKAGE DESIGNER</Typography>
                    <div style={{ width: 202 }}></div>
                </Toolbar>
            </AppBar>

			{/* Content */}
            <Container className={classes.page}>
                {/* Package Manager */}
                <TableContainer component={Paper} className={classes.container} elevation={0}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.titleCell} align='center' colSpan={3}>
                                        <Typography
                                            className={classes.titles}
                                            variant='h5'
                                        >
                                            Package Manager
                                        </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packageData.map((pkg, index) => (
                                <TableRow key={`package-${index}`}>
                                    <TableCell className={classes.cell} align='left' key={`name-${pkg.name}`} width='55%'>
										<Typography>{pkg.name || 'No Name'}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.cell} align='left' key={`price-${pkg.name}`} width='40%'>
										<Typography>{format(pkg.price || 0)}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Service Manager */}
                <TableContainer component={Paper} className={classes.container} elevation={0}>
                    <Table className={classes.twinTable}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.titleCell} align='center' colSpan={2}>
									<Typography
										className={classes.titles}
										variant='h5'
									>
										Service Manager
									</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {serviceData.map((pkg, index) => (
                                <TableRow key={`package-${index}`}>
                                    <TableCell className={classes.cell} align='left' key={`name-${pkg.name}`}>
										<Typography>{pkg.name || 'No Name'}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Addon Manager */}
                <TableContainer component={Paper} className={classes.container} elevation={0}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.titleCell} align='center' colSpan={5}>
									<Typography
										className={classes.titles}
										variant='h5'
									>
										Additional Offers Manager
									</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addonData.map((value, index) => (
                                <TableRow key={`package-${index}`}>
                                    <TableCell className={classes.cell} component='th' width='10%'>
										<Typography>{value.type}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.cell} component='th' width='25%'>
										<Typography>{value.name || 'No Name'}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.cell} component='th'>
										<Typography>{value.description || 'No Description'}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.cell} align='center' key={`price-${index}`} width='15%'>
											<Typography>{format(value.price || 0)}</Typography>
                                        </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
                {/* Services Table */}
                <TableContainer component={Paper} className={classes.container} elevation={0}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.titleCell} align='left' rowSpan={2} width='30%'>
                                        <Typography
                                            className={classes.tableTitles}
                                            variant='h5'
                                        >
                                            Services
                                        </Typography>
                                </TableCell>
                                {packageData.map((pkg, index) => (
                                    <TableCell className={classes.cell} align='center' key={`name-${pkg.name}`}>
                                        <Typography name={`name-${index}`}>{pkg.name || 'No Name'}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                {packageData.map((pkg, index) => (
                                    <TableCell className={classes.titleCell} align='center' key={`price-${pkg.name}`}>
                                        <Typography name={`price-${index}`}>{format(pkg.price || 0)}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {serviceData.map((value, index) => (
                                <TableRow key={`row-${index}`}>
                                    <TableCell className={classes.cell} component='th' align='left' width='30%'>
                                        <Typography name={`name-${index}`}>{value.name || 'No Name'}</Typography>
                                    </TableCell>
                                    {packageData.map((pkg, ind) => (
                                        <TableCell className={classes.cell} align='center' key={`package-${ind + 1}`}>
											{
												value[`checked-${ind + 1}`]
													? <CheckCircle style={{ color: '#4B8FCE', transform: 'scale(1.2)' }} />
													: <Cancel style={{ color: '#808080', transform: 'scale(1.2)' }} />
											}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Addons Table */}
                <TableContainer component={Paper} className={classes.container} elevation={0}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                                <TableCell className={classes.titleCell} align='left' rowSpan={2} colSpan={2} width='30%'>
                                        <Typography
                                            className={classes.tableTitles}
                                            variant='h5'
                                        >
                                            Additional Offers
                                        </Typography>
                                </TableCell>
                                {packageData.map((pkg, index) => (
                                    <TableCell className={classes.cell} align='center' key={`name-${pkg.name}`}>
                                        <Typography name={`name-${index}`}>{pkg.name || 'No Name'}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                {packageData.map((pkg, index) => (
                                    <TableCell className={classes.titleCell} align='center' key={`price-${pkg.name}`}>
                                        <Typography name={`price-${index}`}>{format(pkg.price || 0)}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addonData.map((value, index) => (
                                <>
                                <TableRow key={`row-${index}`}>
                                    <TableCell className={classes.cell} component='th' align='left' width='10%'>
                                        <Typography name={`type-${index}`}>{value.type}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.cell} component='th' align='left' width='20%'>
                                        <Typography name={`name-${index}`}>{value.name || 'No Name'}</Typography>
                                    </TableCell>
                                    {packageData.map((pkg, ind) => (
                                        <TableCell className={classes.cell} align='center' key={`package-${ind + 1}`} rowSpan={2}>
											{
												value[`checked-${ind + 1}`]
													? <CheckCircle style={{ color: '#4B8FCE', transform: 'scale(1.2)' }} />
													: <Cancel style={{ color: '#808080', transform: 'scale(1.2)' }} />
											}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    <TableCell className={index === addonData.length - 1 ? classes.cell : undefined} component='th' align='left' width='30%' colSpan={2}>
                                        <Typography name={`description-${index}`}>{value.description || 'No Description'}</Typography>
                                    </TableCell>
                                </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Calculation Table */}
                <TableContainer component={Paper} className={classes.container} elevation={0}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.titleCell} align='left' width='15%'>
                                        <Typography
                                            className={classes.tableTitles}
                                            variant='h5'
                                        >
                                            Calculations
                                        </Typography>
                                </TableCell>
                                <TableCell className={classes.titleCell} align='center'>
                                    <Typography>
                                        Price
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.titleCell} align='center'>
                                    <Typography>
                                        Number Sold	
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.titleCell} align='center'>
                                    <Typography>
                                        Hours of Work
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.titleCell} align='center'>
                                    <Typography>
                                        Cost per Hour
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.titleCell} align='center'>
                                    <Typography>
                                        Employee*
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.titleCell} align='center'>
                                    <Typography>
                                        Other Costs
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.titleCell} align='right'>
                                    <Typography>
                                        Gross Profit
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {calcData.map((item, index) => (
                                <TableRow key={`packagedata-${index}`}>
                                    <TableCell width='23%'>
                                        <Typography>
                                            {item.name || 'No Name'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='center' width='11%'>
                                        <Typography>
                                            {format(item.price || 0)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='center' width='11%'>
										<Typography>{item.sold}</Typography>
                                    </TableCell>
                                    <TableCell width='11%'>
										<Typography>{item.hours}</Typography>
                                    </TableCell>
                                    <TableCell align='center' width='11%'>
										<Typography>{format(item.cph || 0)}</Typography>
                                    </TableCell>
                                    <TableCell align='center' width='11%'>
										<Typography>
											{
												item.checked
													? <CheckCircle style={{ color: '#4B8FCE' }} />
													: <Cancel style={{ color: '#808080' }} />
											}
										</Typography>
                                    </TableCell>
                                    <TableCell align='center' width='11%'>
										<Typography>{format(item.costs || 0)}</Typography>
                                    </TableCell>
                                    <TableCell align='right' width='11%'>
                                        <Typography>{format(item.profit || 0)}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell className={classes.cell}
                                    align='right'
                                    colSpan={8}
                                >
                                    <Typography>Total Estimated Gross Profit = {format(total || 0)}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.cell} colSpan={6}>
                                    <Typography>* Employee costs are calcuated to be 25% more than independent consultant costs.</Typography>
                                </TableCell>
                                <TableCell className={classes.cell}
                                    align='right'
                                    colSpan={2}
                                >
									<Typography>Goal = {format(goal || 0)}</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
			</Container>

			{/* Footer */}
			<Container className={classes.footerBar}>
				<Container className={classes.toolBar}>
					<Stack direction='row' justifyContent='flex-start' alignItems='center' className={classes.stack}>
						<Link href='https://www.thefearlessclimb.com/'>
							<Image src='/logo2.jpg' alt='logo' width={80} height={80} />
						</Link>
						<IconButton href='https://www.facebook.com/growapairofantlers'>
							<Facebook style={{ color: '#E5B634', width: 30, height: 30 }} />
						</IconButton>
						<IconButton href='https://www.twitter.com/fearlessclimb'>
							<Twitter style={{ color: '#E5B634', width: 30, height: 30 }} />
						</IconButton>
						<IconButton href='https://www.instagram.com/thefearlessclimb/'>
							<Instagram style={{ color: '#E5B634', width: 30, height: 30 }} />
						</IconButton>
						<IconButton href='https://www.youtube.com/channel/UCunzmYrDrBmzBY2l1p8z7eg'>
							<YouTube style={{ color: '#E5B634', width: 30, height: 30 }} />
						</IconButton>
						<IconButton href='https://www.pinterest.com/thefearlessclimb'>
							<Pinterest style={{ color: '#E5B634', width: 30, height: 30 }} />
						</IconButton>
						<IconButton href='https://www.linkedin.com/in/thefearlessclimb'>
							<LinkedIn style={{ color: '#E5B634', width: 30, height: 30 }} />
						</IconButton>
						<Typography align='right' variant='h6' flexGrow={1}>{`© ${(new Date).getFullYear()} The Fearless Group Inc. All rights reserved.`}</Typography>
					</Stack>
				</Container>
			</Container>
        </Root>
	);
}

export default Rendered;