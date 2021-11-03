import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import {
	Container,
	Button,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	TextField,
	Checkbox,
	IconButton,
	Select,
	MenuItem,
	Typography,
	InputAdornment,
	AppBar,
	Toolbar,
	Tooltip,
	Stack,
	Link,
    tooltipClasses,
} from '@mui/material';
import {
	CheckCircle,
	Cancel,
	Add,
	Delete,
	Refresh,
	Print,
	HelpOutline,
	Facebook,
	Twitter,
	Instagram,
	YouTube,
	Pinterest,
	LinkedIn,
} from '@mui/icons-material';
import base64url from 'base64-url';
import { defaultPackageData, defaultServiceData, defaultAddonData, defaultCalcData } from '../data/constants';

const PREFIX = 'Home';

const classes = {
    container: `${PREFIX}-container`,
    toolBar: `${PREFIX}-toolBar`,
    print: `${PREFIX}-print`,
    addButton: `${PREFIX}-addButton`,
    updateButton: `${PREFIX}-updateButton`,
    titles: `${PREFIX}-titles`,
    tableTitles: `${PREFIX}-tableTitles`,
    page: `${PREFIX}-page`,
    titleBar: `${PREFIX}-titleBar`,
    line: `${PREFIX}-line`,
    cell: `${PREFIX}-cell`,
    titleCell: `${PREFIX}-titleCell`,
    pageTitle: `${PREFIX}-pageTitle`,
    helpIcon: `${PREFIX}-helpIcon`,
    footerBar: `${PREFIX}-footerBar`,
	stack: `${PREFIX}-stack`,
    tooltip: `${PREFIX}-tooltip`,
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
        borderWidth: 3,
        fontWeight: 'bold',
		width: 202,
		height: 60,
		margin: 30
	},
	[`& .${classes.addButton}`]: {
		width: '60%',
		backgroundColor: '#4B8FCE',
		color: '#000000',
		'&:hover': {
			backgroundColor: '#5F9BD3'
		},
		fontSize: '1.25em'
	},
	[`& .${classes.updateButton}`]: {
		width: '60%',
		backgroundColor: '#E5B634',
		color: '#000000',
		'&:hover': {
			backgroundColor: '#F5C400'
		},
		fontSize: '1.25em'
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
	[`& .${classes.line}`]: {
		backgroundColor: '#580967',
		height: 6
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
	[`& .${classes.helpIcon}`]: {
		marginLeft: 5
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
    [`& .${classes.tooltip}`]: {
		fontSize: 20,
	},
});

const WideTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 400,
        backgroundColor: '#4B8FCE',
        color: '#000000',
    },
});

const Home = () => {

	const router = useRouter();

	// Package Events

	const [packageMngrData, setPackageMngrData] = useState(defaultPackageData);
	const [packageVwrData, setPackageVwrData] = useState(defaultPackageData);
	const [packageUnsavedData, setPackageUnsavedData] = useState(defaultPackageData);

	const handlePackageNameInput = (event) => {
		const index = event.target.name.split('-')[1];
		const colData = Object.assign([], packageUnsavedData);
		colData[index] = { ...colData[index], name: event.target.value };
		setPackageUnsavedData(colData);
	}

	const handlePackagePriceInput = (event) => {
        const value = event.target.value.replace(/,/g, '');
        if (!isNumeric(value, event.target.name)) return;
		const index = event.target.name.split('-')[1];
		const colData = Object.assign([], packageUnsavedData);
        const float = parseFloat(value);
		colData[index] = { ...colData[index], price: float };
		setPackageUnsavedData(colData);
        if (!Number.isNaN(float)) {
            const floatVal = value.split('').pop() === '.' ? '.' : '';
            event.target.value = parseFloat(value).toLocaleString('en-US', {
                style: 'decimal',
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
            }) + floatVal;
        }
	}

	const handlePackageMngrAdd = (event) => {
		const newRow = { name: '' };

        const [name, ...packages] = Object.keys(serviceUnsavedData[0]);
        const serviceData = Object.assign([], serviceUnsavedData);
        for (const service of serviceData) {
            service[`checked-${packages.length + 1}`] = false;
        }
        setServiceUnsavedData(serviceData);

        const [name2, type, description, ...packages2] = Object.keys(addonUnsavedData[0]);
        const addonData = Object.assign([], addonUnsavedData);
        for (const addon of addonData) {
            addon[`checked-${packages2.length + 1}`] = false;
        }
        setAddonUnsavedData(addonData);

        const calcDataCopy = Object.assign([], calcData);
        calcDataCopy.push({
            name: '',
            price: 0,
            hours: 0,
            checked: false,
            cph: 0,
            costs: 0,
            sold: 0,
        });
        setCalcData(calcDataCopy);

		setPackageUnsavedData([ ...packageUnsavedData, newRow ]);
        setPackageMngrData([ ...packageUnsavedData, newRow ]);
	}

	const handlePackageMngrRemove = (event, index) => {
		const colData = Object.assign([], packageUnsavedData);
		colData.splice(index, 1);
        setPackageUnsavedData(colData);
		setPackageMngrData(colData);
	}

	const handleUpdate = (event) => {
		// Packages
		setPackageVwrData(packageUnsavedData);

        // Services
		setServiceVwrData(serviceUnsavedData);

		// Addons
		setAddonVwrData(addonUnsavedData);

		const newData = [];
		let packagesAdded = 0;
		packageUnsavedData.forEach((pkg, index) => {
			if (calcData[index].type) {
				newData.push({ name: pkg.name || 'No Name', price: pkg.price || 0, hours: 0, cph: 0, costs: 0, sold: 0, checked: false });
				packagesAdded++;
			} else {
				newData.push({ ...calcData[index], name: pkg.name || 'No Name', price: pkg.price || 0 });
			}
		});

		addonUnsavedData.forEach((addon, index) => {
			newData.push({ ...calcData[newData.length - packagesAdded], name: addon.name || 'No Name', type: addon.type, description: addon.description || 'No Description', price: addon.price || 0 });
		});

		setCalcData(newData);
	}

	// Service Events

	const [serviceMngrData, setServiceMngrData] = useState(defaultServiceData);
	const [serviceVwrData, setServiceVwrData] = useState(defaultServiceData);
	const [serviceUnsavedData, setServiceUnsavedData] = useState(defaultServiceData);

	const handleServiceNameInput = (event) => {
		const splitName = event.target.name.split('-');
		const dataCopy = Object.assign([], serviceUnsavedData);
		dataCopy[splitName[1]] = { ...dataCopy[splitName[1]], name: event.target.value };
		setServiceUnsavedData(dataCopy);
	}

	const handleServiceMngrAdd = (event) => {
		const newRowData = { name: '' };
		const [name, ...packages] = Object.keys(serviceUnsavedData[0]);
		for (let i = 0; i < packages.length; i++) {
			newRowData[packages[i]] = false;
		}

		setServiceMngrData([ ...serviceUnsavedData, newRowData ]);
		setServiceUnsavedData([ ...serviceUnsavedData, newRowData ]);
	}

	const handleServiceMngrRemove = (event, index) => {
		const dataCopy = Object.assign([], serviceUnsavedData);
		dataCopy.splice(index, 1);
        setServiceUnsavedData(dataCopy);
		setServiceMngrData(dataCopy);
	}

	const handleServiceToggle = (event) => {
		const splitName = event.target.name.split('-');
		const dataCopy = Object.assign([], serviceVwrData);
		dataCopy[splitName[1]] = { ...dataCopy[splitName[1]], [`checked-${splitName[2]}`]: event.target.checked };
        setServiceUnsavedData(dataCopy);
		setServiceVwrData(dataCopy);
	}

	// Addon Events

	const [addonMngrData, setAddonMngrData] = useState(defaultAddonData);
	const [addonVwrData, setAddonVwrData] = useState(defaultAddonData);
	const [addonUnsavedData, setAddonUnsavedData] = useState(defaultAddonData);

	const handleAddonNameInput = (event) => {
		const splitName = event.target.name.split('-');
		const dataCopy = Object.assign([], addonUnsavedData);
		dataCopy[splitName[1]] = { ...dataCopy[splitName[1]], name: event.target.value };
		setAddonUnsavedData(dataCopy);
	}

	const handleAddonDescriptionInput = (event) => {
		const splitName = event.target.name.split('-');
		const dataCopy = Object.assign([], addonUnsavedData);
		dataCopy[splitName[1]] = { ...dataCopy[splitName[1]], description: event.target.value };
		setAddonUnsavedData(dataCopy);
	}

	const handleAddonTypeChange = (event) => {
		const splitName = event.target.name.split('-');
		const dataCopy = Object.assign([], addonUnsavedData);
		dataCopy[splitName[1]] = {...dataCopy[splitName[1]], type: event.target.value };
		setAddonUnsavedData(dataCopy);
	}

	const handleAddonMngrAdd = (event) => {
		const [name, type, description, price, ...packages] = Object.keys(addonUnsavedData[0]);
		const newRowData = { name: '', type: 'Addon', description: '', price: '' };

		for (let i = 0; i < packages.length; i++) {
			newRowData[packages[i]] = false;
		}

		setAddonMngrData([ ...addonUnsavedData, newRowData ]);
		setAddonUnsavedData([ ...addonUnsavedData, newRowData ]);
	}

	const handleAddonMngrRemove = (event, index) => {
		const dataCopy = Object.assign([], addonUnsavedData);
		dataCopy.splice(index, 1);
        setAddonUnsavedData(dataCopy);
		setAddonMngrData(dataCopy);
	}

	const handleAddonToggle = (event) => {
		const splitName = event.target.name.split('-');
		const dataCopy = Object.assign([], addonVwrData);
		dataCopy[splitName[1]] = { ...dataCopy[splitName[1]], [`checked-${splitName[2]}`]: event.target.checked };
        setAddonUnsavedData(dataCopy);
		setAddonVwrData(dataCopy);
	}

	const handleAddonPriceInput = (event) => {
        const value = event.target.value.replace(/,/g, '');
        if (!isNumeric(value, event.target.name)) return;
		const index = event.target.name.split('-')[1];
		const colData = Object.assign([], addonUnsavedData);
        const float = parseFloat(value);
		colData[index] = { ...colData[index], price: float };
		setAddonUnsavedData(colData);
        if (!Number.isNaN(float)) {
            const floatVal = value.split('').pop() === '.' ? '.' : '';
            event.target.value = float.toLocaleString('en-US', {
                style: 'decimal',
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
            }) + floatVal;
        }
	}

	// Calculation Events

	const [calcData, setCalcData] = useState(defaultCalcData);
	const [goalData, setGoalData] = useState(0);

	const handleHoursChange = (event) => {
        if (!isNumeric(event.target.value, event.target.name)) return;
		const splitName = event.target.name.split('-')[1];
		const dataCopy = Object.assign([], calcData);
		dataCopy[splitName] = { ...dataCopy[splitName], hours: event.target.value ?? 0 };
		setCalcData(dataCopy);
	}

	const handleCPHToggle = (event) => {
		const splitName = event.target.name.split('-')[1];
		const dataCopy = Object.assign([], calcData);
		dataCopy[splitName] = { ...dataCopy[splitName], checked: event.target.checked };
		setCalcData(dataCopy);
	}

	const handleCPHChange = (event) => {
        const value = event.target.value.replace(/,/g, '');
        if (!isNumeric(value, event.target.name)) return;
		const splitName = event.target.name.split('-')[1];
		const dataCopy = Object.assign([], calcData);
        let float = parseFloat(value);
		dataCopy[splitName] = { ...dataCopy[splitName], cph: Number.isNaN(float) ? 0 : float };
		setCalcData(dataCopy);
        if (!Number.isNaN(float)) {
            const floatVal = value.split('').pop() === '.' ? '.' : '';
            event.target.value = float.toLocaleString('en-US', {
                style: 'decimal',
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
            }) + floatVal;
        }
	}

	const handleCostsChange = (event) => {
        const value = event.target.value.replace(/,/g, '');
        if (!isNumeric(value, event.target.name)) return;
		const splitName = event.target.name.split('-')[1];
		const dataCopy = Object.assign([], calcData);
        const float = parseFloat(value);
		dataCopy[splitName] = { ...dataCopy[splitName], costs: Number.isNaN(float) ? 0 : float };
		setCalcData(dataCopy);
        if (!Number.isNaN(float)) {
            const floatVal = value.split('').pop() === '.' ? '.' : '';
            event.target.value = float.toLocaleString('en-US', {
                style: 'decimal',
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
            }) + floatVal;
        }
	}

	const handleSoldChange = (event) => {
        if (!isNumeric(event.target.value, event.target.name)) return;
		const splitName = event.target.name.split('-')[1];
		const dataCopy = Object.assign([], calcData);
		dataCopy[splitName] = { ...dataCopy[splitName], sold: event.target.value ?? 0 };
		setCalcData(dataCopy);
	}

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});

	const calculateProfit = (index) => {
		const { price, hours, checked, cph, costs, sold } = calcData[index];
		let profit = (price - (hours * (checked ? cph * 1.25 : cph)) - costs) * sold;
        if (Number.isNaN(profit)) profit = 0;
		calcData[index] = { ...calcData[index], profit };
		return formatter.format(profit.toFixed(2));
	}

	const calculateTotal = () => {
		return formatter.format(calcData.reduce((acc, cur) => acc + Number(cur.profit), 0));
	}

    const generateQueryString = () => {
        const pkgData = base64url.encode(base64url.escape(JSON.stringify(packageVwrData)));
        const srvData = base64url.encode(base64url.escape(JSON.stringify(serviceVwrData)));
        const adnData = base64url.encode(base64url.escape(JSON.stringify(addonVwrData)));
        const clcData = base64url.encode(base64url.escape(JSON.stringify(calcData)));
        const gData = base64url.encode(base64url.escape(goalData.toString()));
        return `pkg=${pkgData}&srv=${srvData}&adn=${adnData}&clc=${clcData}&g=${gData}`;
    }

    const [errors, setErrors] = useState({});

    const isNumeric = (value, name) => {
        if (/^\d*\.?\d*$/gm.test(value)) {
            const obj = errors;
            obj[name] = false;
            setErrors(obj);
            return true;
        } else {
            const obj = errors;
            obj[name] = true;
            setErrors(obj);
            return false;
        }
    }

	if (router.query.ref !== 'dGhlZmVhcmxlc3NjbGltYg') {
		return ( <p>Please access this page through your portal on <a href='https://thefearlessclimb.com/'>TheFearlessClimb.com</a></p> );
	}

	return (
		<Root>
            <Head><title>The Fearless Climb Business Package Designer</title></Head>
			{/* Header */}
            <AppBar className={classes.titleBar} fullWidth elevation={0}>
                <Toolbar className={classes.toolBar}>
                    <Image src='/logo.png' alt='logo' width={262} height={120} />
                    <Typography variant='h4' className={classes.pageTitle} align='center'>BUSINESS PACKAGE DESIGNER</Typography>
                    <Button
                        className={classes.print}
                        variant='outlined'
                        size='large'
                        href={`/rendered?${generateQueryString()}`}
                        startIcon={<Print />}
                        target='_blank'
                    >
                        <Typography>
                            Print
                        </Typography>
                    </Button>
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
                                    <WideTooltip placement='bottom' title={<h2 className={classes.tooltip}>Enter the name and price of each package you sell.</h2>}>
                                        <Typography
                                            className={classes.titles}
                                            variant='h5'
                                        >
                                            Package Manager <HelpOutline className={classes.helpIcon} size='large' />
                                        </Typography>
                                    </WideTooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packageMngrData.map((pkg, index) => (
                                <TableRow key={`package-${index}`}>
                                    <TableCell className={classes.cell} align='center' width='5%'>
                                        {index === packageMngrData.length - 1 ? 
                                            <IconButton size='small' onClick={(e) => handlePackageMngrRemove(e, index)}>
                                                <Delete />
                                            </IconButton>
                                            : <></>
                                        }
                                    </TableCell>
                                    <TableCell className={classes.cell} align='left' key={`name-cell-${index}`} width='55%'>
                                        <TextField
                                            variant='outlined'
                                            size='large'
                                            label='Name'
                                            defaultValue={pkg.name}
                                            name={`name-${index}`}
                                            onChange={handlePackageNameInput}
                                            fullWidth
                                        ></TextField>
                                    </TableCell>
                                    <TableCell className={classes.cell} align='left' key={`price-cell-${index}`} width='40%'>
                                        <TextField
                                            variant='outlined'
                                            size='large'
                                            label='Price'
                                            defaultValue={pkg.price}
                                            name={`price-${index}`}
                                            error={errors[`price-${index}`] === true}
                                            helperText={errors[`price-${index}`] === true ? 'Must be numeric' : ''}
                                            InputProps={{
                                                startAdornment: <InputAdornment position='start'>$</InputAdornment>
                                            }}
                                            onChange={handlePackagePriceInput}
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell className={classes.cell} colSpan={3} align='center'>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        size='large'
                                        fullWidth
                                        onClick={handlePackageMngrAdd}
                                        startIcon={<Add />}
                                        className={classes.addButton}
                                    >
                                    Add Package
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.cell} colSpan={3} align='center'>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        size='large'
                                        fullWidth
                                        onClick={handleUpdate}
                                        startIcon={<Refresh />}
                                        className={classes.updateButton}
                                    >
                                    Update
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Service Manager */}
                <TableContainer component={Paper} className={classes.container} elevation={0}>
                    <Table className={classes.twinTable}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.titleCell} align='center' colSpan={2}>
                                    <WideTooltip placement='top' title={<h2 className={classes.tooltip}>Enter the description of each basic service that is included in your packages.</h2>}>
                                        <Typography
                                            className={classes.titles}
                                            variant='h5'
                                        >
                                            Service Manager <HelpOutline className={classes.helpIcon} size='large' />
                                        </Typography>
                                    </WideTooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {serviceMngrData.map((pkg, index) => (
                                <TableRow key={`package-${index}`}>
                                    <TableCell className={classes.cell} align='center' width='5%'>
                                        {index === serviceMngrData.length - 1 ?
                                            <IconButton size='small' onClick={(e) => handleServiceMngrRemove(e, index)}>
                                                <Delete />
                                            </IconButton>
                                            : <></>
                                        }
                                        
                                    </TableCell>
                                    <TableCell className={classes.cell} align='left' key={`name-cell-${index}`}>
                                        <TextField
                                            variant='outlined'
                                            size='large'
                                            label='Description'
                                            name={`name-${index}`}
                                            onChange={handleServiceNameInput}
                                            fullWidth
                                            disabled={false}
                                        ></TextField>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell className={classes.cell} colSpan={3} align='center' width='5%'>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        size='large'
                                        fullWidth
                                        onClick={handleServiceMngrAdd}
                                        startIcon={<Add />}
                                        className={classes.addButton}
                                    >
                                    Add Service
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.cell} colSpan={3} align='center'>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        size='large'
                                        fullWidth
                                        onClick={handleUpdate}
                                        startIcon={<Refresh />}
                                        className={classes.updateButton}
                                    >
                                    Update
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Addon Manager */}
                <TableContainer component={Paper} className={classes.container} elevation={0}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.titleCell} align='center' colSpan={5}>
                                    <WideTooltip placement='top' title={<h2 className={classes.tooltip}>Enter the name, description, and price of each service or product you offer in addition to your basic packages. Add-ons are another offer of a related product or service when they say &#39;yes&#39; to your original offer. Bonuses are the best standalone items that are included in, and complement, the base offer. Downsells are cheaper alternatives when they say &#39;no&#39; to your original offer. Upsells are upgrades that increase both the value and price of the original offer.</h2>}>
                                        <Typography
                                            className={classes.titles}
                                            variant='h5'
                                        >
                                            Additional Offers Manager <HelpOutline className={classes.helpIcon} size='large' />
                                        </Typography>
                                    </WideTooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addonMngrData.map((value, index) => (
                                <TableRow key={`package-${index}`}>
                                    <TableCell className={classes.cell} align='center' width='5%'>
                                        {index === addonMngrData.length - 1 ?
                                            <IconButton size='small' onClick={(e) => handleAddonMngrRemove(e, index)}>
                                                <Delete />
                                            </IconButton>
                                            : <></>
                                        }
                                        
                                    </TableCell>
                                    <TableCell className={classes.cell} component='th' width='10%'>
                                        <Select
                                            name={`type-${index}`}
                                            variant='outlined'
                                            size='large'
                                            defaultValue={value.type}
                                            fullWidth
                                            onChange={handleAddonTypeChange}
                                        >
                                            <MenuItem value={'Addon'}>Addon</MenuItem>
                                            <MenuItem value={'Upsell'}>Upsell</MenuItem>
                                            <MenuItem value={'Downsell'}>Downsell</MenuItem>
                                            <MenuItem value={'Bonus'}>Bonus</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell className={classes.cell} component='th' width='25%'>
                                        <TextField
                                            variant='outlined'
                                            label='Name'
                                            defaultValue={value.name}
                                            fullWidth
                                            name={`name-${index}`}
                                            onChange={handleAddonNameInput}
                                        ></TextField>
                                    </TableCell>
                                    <TableCell className={classes.cell} component='th'>
                                        <TextField
                                            variant='outlined'
                                            label='Description'
                                            defaultValue={value.description}
                                            fullWidth
                                            name={`description-${index}`}
                                            onChange={handleAddonDescriptionInput}
                                        ></TextField>
                                    </TableCell>
                                    <TableCell className={classes.cell} align='center' key={`price-cell-${index}`} width='15%'>
                                            <TextField
                                                variant='outlined'
                                                label='Price'
                                                defaultValue={value.price}
                                                name={`price-${index}`}
                                                fullWidth
                                                error={errors[`price-${index}`] === true}
                                                helperText={errors[`price-${index}`] === true ? 'Must be numeric' : ''}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position='start'>$</InputAdornment>
                                                }}
                                                onChange={handleAddonPriceInput}
                                            ></TextField>
                                        </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell className={classes.cell} colSpan={5} align='center' width='5%'>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        size='large'
                                        fullWidth
                                        onClick={handleAddonMngrAdd}
                                        startIcon={<Add />}
                                        className={classes.addButton}
                                    >
                                    Add Additional Offer
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.cell} colSpan={5} align='center' width='5%'>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        size='large'
                                        fullWidth
                                        onClick={handleUpdate}
                                        startIcon={<Refresh />}
                                        className={classes.updateButton}
                                    >
                                    Update
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                
                {/* Services Table */}
                <TableContainer component={Paper} className={classes.container} elevation={0}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.titleCell} align='left' rowSpan={2} width='30%'>
                                    <WideTooltip placement='top-start' title={<h2 className={classes.tooltip}>Click on the circles. A checkmark includes that service in a package.</h2>}>
                                        <Typography
                                            className={classes.tableTitles}
                                            variant='h5'
                                        >
                                            Services <HelpOutline className={classes.helpIcon} size='large' />
                                        </Typography>
                                    </WideTooltip>
                                </TableCell>
                                {packageVwrData.map((pkg, index) => (
                                    <TableCell className={classes.cell} align='center' key={`name-cell-${index}`}>
                                        <Typography name={`name-${index}`}>{pkg.name || 'No Name'}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                {packageVwrData.map((pkg, index) => (
                                    <TableCell className={classes.titleCell} align='center' key={`price-cell-${index}`}>
                                        <Typography name={`price-${index}`}>${parseFloat(pkg.price || 0).toLocaleString('en-US', {
                                            style: 'decimal',
                                            maximumFractionDigits: 2,
                                            minimumFractionDigits: 0,
                                        })}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {serviceVwrData.map((value, index) => (
                                <TableRow key={`row-${index}`}>
                                    <TableCell className={classes.cell} component='th' align='left' width='30%'>
                                        <Typography name={`name-${index}`}>{value.name || 'No Name'}</Typography>
                                    </TableCell>
                                    {packageVwrData.map((pkg, ind) => (
                                        <TableCell className={classes.cell} align='center' key={`package-${ind + 1}`}>
                                            <Checkbox
                                                icon={<Cancel style={{ color: '#808080' }} />}
                                                checkedIcon={<CheckCircle style={{ color: '#4B8FCE' }} />}
                                                checked={value[`checked-${ind + 1}`]}
                                                onChange={handleServiceToggle}
                                                name={`checked-${index}-${ind + 1}`}
                                                style={{ transform: 'scale(1.2)' }}
                                            />
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
                                    <WideTooltip placement='top-start' title={<h2 className={classes.tooltip}>Click on the circles. A checkmark includes that additional offer in a package.</h2>}>
                                        <Typography
                                            className={classes.tableTitles}
                                            variant='h5'
                                        >
                                            Additional Offers <HelpOutline className={classes.helpIcon} size='large' />
                                        </Typography>
                                    </WideTooltip>
                                </TableCell>
                                {packageVwrData.map((pkg, index) => (
                                    <TableCell className={classes.cell} align='center' key={`name-cell-${index}`}>
                                        <Typography name={`name-${index}`}>{pkg.name || 'No Name'}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                {packageVwrData.map((pkg, index) => (
                                    <TableCell className={classes.titleCell} align='center' key={`price-cell-${index}`}>
                                        <Typography name={`price-${index}`}>${parseFloat(pkg.price || 0).toLocaleString('en-US', {
                                            style: 'decimal',
                                            maximumFractionDigits: 2,
                                            minimumFractionDigits: 0,
                                        })}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addonVwrData.map((value, index) => (
                                <>
                                <TableRow key={`row-${index}`}>
                                    <TableCell className={classes.cell} component='th' align='left' width='10%'>
                                        <Typography name={`type-${index}`}>{value.type}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.cell} component='th' align='left' width='20%'>
                                        <Typography name={`name-${index}`}>{value.name || 'No Name'}</Typography>
                                    </TableCell>
                                    {packageVwrData.map((pkg, ind) => (
                                        <TableCell className={classes.cell} align='center' key={`package-${ind + 1}`} rowSpan={2}>
                                            <Checkbox
                                                icon={<Cancel style={{ color: '#808080' }} />}
                                                checkedIcon={<CheckCircle style={{ color: '#4B8FCE' }} />}
                                                checked={value[`checked-${ind + 1}`]}
                                                onChange={handleAddonToggle}
                                                name={`checked-${index}-${ind + 1}`}
                                                style={{ transform: 'scale(1.2)' }}
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    <TableCell className={index === addonVwrData.length - 1 ? classes.cell : undefined} component='th' align='left' width='30%' colSpan={2}>
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
                                    <WideTooltip placement='top-start' title={<h2 className={classes.tooltip}>
                                        I recommend you do these calculations for one month of sales.
                                        Enter the number of packages and additional offers you think you will sell. 
                                        Enter the number of hours of work it takes to provide a package or additional offer, if you use an employee or independent contractor. 
                                        Then enter the cost per hour of the employee or independent contractor. 
                                        The calculation will automatically add 25% to the labor cost if you click on the circle to indicate it&#39;s being done by an employee. 
                                        Also enter any other costs you incur to fulfill the package or additional offer. 
                                        And finally, enter your goal to compare to your gross profit. 
                                        </h2>}>
                                        <Typography
                                            className={classes.tableTitles}
                                            variant='h5'
                                        >
                                            Calculations <HelpOutline className={classes.helpIcon} size='large' />
                                        </Typography>
                                    </WideTooltip>
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
                                        Employee?*
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
                                            ${item.price || 0}
                                        </Typography>
                                    </TableCell>
                                    <TableCell width='11%'>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            label='Number Sold'
                                            defaultValue={0}
                                            error={errors[`sold-${index}`] === true}
                                            helperText={errors[`sold-${index}`] === true ? 'Must be numeric' : ''}
                                            name={`sold-${index}`}
                                            onChange={handleSoldChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell width='11%'>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            label='Hours of Work'
                                            defaultValue={0}
                                            error={errors[`hours-${index}`] === true}
                                            helperText={errors[`hours-${index}`] === true ? 'Must be numeric' : ''}
                                            name={`hours-${index}`}
                                            onChange={handleHoursChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell width='11%'>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            label='Cost per Hour'
                                            defaultValue={0}
                                            name={`cph-${index}`}
                                            error={errors[`cph-${index}`] === true}
                                            helperText={errors[`cph-${index}`] === true ? 'Must be numeric' : ''}
                                            InputProps={{
                                                startAdornment: <InputAdornment position='start'>$</InputAdornment>
                                            }}
                                            onChange={handleCPHChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell align='center' width='11%'>
                                        <Checkbox
                                            icon={<Cancel style={{ color: '#808080' }} />}
                                            checkedIcon={<CheckCircle style={{ color: '#4B8FCE' }} />}
                                            checked={item.checked}
                                            onChange={handleCPHToggle}
                                            name={`checked-${index}`}>
                                        </Checkbox>
                                    </TableCell>
                                    <TableCell width='11%'>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            label='Other Costs'
                                            defaultValue={0}
                                            name={`costs-${index}`}
                                            error={errors[`costs-${index}`] === true}
                                            helperText={errors[`costs-${index}`] === true ? 'Must be numeric' : ''}
                                            InputProps={{
                                                startAdornment: <InputAdornment position='start'>$</InputAdornment>
                                            }}
                                            onChange={handleCostsChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell align='right' width='11%'>
                                        <Typography>{calculateProfit(index) || '$0'}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell className={classes.cell}
                                    align='right'
                                    colSpan={8}
                                >
                                    <Typography>Total Estimated Gross Profit = {calculateTotal() || '$0'}</Typography>
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
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Goal'
                                        defaultValue={0}
                                        name='goal'
                                        onChange={(event) => {
                                            const value = event.target.value.replace(/,/g, '');
                                            if (!isNumeric(value, event.target.name)) return;
                                            const float = parseFloat(value);
                                            setGoalData(float);
                                            if (!Number.isNaN(float)) {
                                                const floatVal = value.split('').pop() === '.' ? '.' : '';
                                                event.target.value = float.toLocaleString('en-US', {
                                                    style: 'decimal',
                                                    maximumFractionDigits: 2,
                                                    minimumFractionDigits: 0,
                                                }) + floatVal;
                                            }
                                        }}
                                        inputProps={{ style: { textAlign: 'right' } }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position='start'>$</InputAdornment>
                                        }}
                                    />
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
						<Link href='https://www.thefearlessclimb.com/' target='_blank'>
							<Image src='/logo2.jpg' alt='logo' width={80} height={80} />
						</Link>
						<IconButton href='https://www.facebook.com/growapairofantlers' target='_blank'>
							<Facebook style={{ color: '#E5B634', width: 30, height: 30 }} />
						</IconButton>
						<IconButton href='https://www.twitter.com/fearlessclimb' target='_blank'>
							<Twitter style={{ color: '#E5B634', width: 30, height: 30 }} />
						</IconButton>
						<IconButton href='https://www.instagram.com/thefearlessclimb/' target='_blank'>
							<Instagram style={{ color: '#E5B634', width: 30, height: 30 }} />
						</IconButton>
						<IconButton href='https://www.youtube.com/channel/UCunzmYrDrBmzBY2l1p8z7eg' target='_blank'>
							<YouTube style={{ color: '#E5B634', width: 30, height: 30 }} />
						</IconButton>
						<IconButton href='https://www.pinterest.com/thefearlessclimb' target='_blank'>
							<Pinterest style={{ color: '#E5B634', width: 30, height: 30 }} />
						</IconButton>
						<IconButton href='https://www.linkedin.com/in/thefearlessclimb' target='_blank'>
							<LinkedIn style={{ color: '#E5B634', width: 30, height: 30 }} />
						</IconButton>
						<Typography align='right' variant='h6' flexGrow={1}>{`© ${(new Date).getFullYear()} The Fearless Group Inc. All rights reserved.`}</Typography>
					</Stack>
				</Container>
			</Container>
        </Root>
    );
}

export default Home;