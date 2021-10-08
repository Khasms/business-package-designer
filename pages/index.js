import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
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
		const index = event.target.name.split('-')[1];
		const colData = Object.assign([], packageUnsavedData);
		colData[index] = { ...colData[index], price: Number(event.target.value) };
		setPackageUnsavedData(colData);
	}

	const handlePackageMngrAdd = (event) => {
		const newRow = { name: '', price: '' };
		setPackageMngrData([ ...packageMngrData, newRow ]);
		setPackageUnsavedData([ ...packageUnsavedData, newRow ]);
	}

	const handlePackageMngrRemove = (event, index) => {
		const colData = Object.assign([], packageVwrData);
		colData.splice(index, 1);
		setPackageMngrData(colData);
		setPackageUnsavedData(colData);
	}

	const handleUpdate = (event) => {
		// Packages
		setPackageVwrData(packageUnsavedData);

		const newData = [];
		let packagesAdded = 0;
		packageUnsavedData.forEach((pkg, index) => {
			if (calcData[index].type) {
				newData.push({ name: pkg.name, price: pkg.price, hours: 0, cph: 0, costs: 0, sold: 0 });
				packagesAdded++;
			} else {
				newData.push({ ...calcData[index], name: pkg.name, price: pkg.price });
			}
		});

		// Services
		setServiceVwrData(serviceUnsavedData);

		// Addons
		setAddonVwrData(addonUnsavedData);

		addonUnsavedData.forEach((addon, index) => {
			newData.push({ ...calcData[newData.length - packagesAdded], name: addon.name, type: addon.type, description: addon.description, price: addon.price });
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
		const [name, ...packages] = Object.keys(serviceMngrData[0]);
		for (let i = 0; i < packages.length; i++) {
			newRowData[packages[i]] = false;
		}

		setServiceMngrData([ ...serviceMngrData, newRowData ]);
		setServiceUnsavedData([ ...serviceMngrData, newRowData ]);
	}

	const handleServiceMngrRemove = (event, index) => {
		const dataCopy = Object.assign([], serviceVwrData);
		dataCopy.splice(index, 1);
		setServiceMngrData(dataCopy);
		setServiceUnsavedData(dataCopy);
	}

	const handleServiceToggle = (event) => {
		const splitName = event.target.name.split('-');
		const dataCopy = Object.assign([], serviceVwrData);
		dataCopy[splitName[1]] = { ...dataCopy[splitName[1]], [`checked-${splitName[2]}`]: event.target.checked };
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
		const [name, type, description, price, ...packages] = Object.keys(addonMngrData[0]);
		const newRowData = { name: '', type: 'Addon', description: '', price: 0 };

		for (let i = 0; i < packages.length; i++) {
			newRowData[packages[i]] = false;
		}

		setAddonMngrData([ ...addonMngrData, newRowData ]);
		setAddonUnsavedData([ ...addonMngrData, newRowData ]);
	}

	const handleAddonMngrRemove = (event, index) => {
		const dataCopy = Object.assign([], addonVwrData);
		dataCopy.splice(index, 1);
		setAddonMngrData(dataCopy);
		setAddonUnsavedData(dataCopy);
	}

	const handleAddonToggle = (event) => {
		const splitName = event.target.name.split('-');
		const dataCopy = Object.assign([], addonVwrData);
		dataCopy[splitName[1]] = { ...dataCopy[splitName[1]], [`checked-${splitName[2]}`]: event.target.checked };
		setAddonVwrData(dataCopy);
	}

	const handleAddonPriceInput = (event) => {
        if (!isNumeric(event.target.value, event.target.name)) return;
		const index = event.target.name.split('-')[1];
		const colData = Object.assign([], addonUnsavedData);
		colData[index] = { ...colData[index], price: Number(event.target.value) };
		setAddonUnsavedData(colData);
	}

	// Calculation Events

	const [calcData, setCalcData] = useState(defaultCalcData);
	const [goalData, setGoalData] = useState(0);

	const handleHoursChange = (event) => {
		const splitName = event.target.name.split('-')[1];
		const dataCopy = Object.assign([], calcData);
		dataCopy[splitName] = { ...dataCopy[splitName], hours: event.target.value };
		setCalcData(dataCopy);
	}

	const handleCPHToggle = (event) => {
		const splitName = event.target.name.split('-')[1];
		const dataCopy = Object.assign([], calcData);
		dataCopy[splitName] = { ...dataCopy[splitName], checked: event.target.checked };
		setCalcData(dataCopy);
	}

	const handleCPHChange = (event) => {
		const splitName = event.target.name.split('-')[1];
		const dataCopy = Object.assign([], calcData);
		dataCopy[splitName] = { ...dataCopy[splitName], cph: event.target.value };
		setCalcData(dataCopy);
	}

	const handleCostsChange = (event) => {
		const splitName = event.target.name.split('-')[1];
		const dataCopy = Object.assign([], calcData);
		dataCopy[splitName] = { ...dataCopy[splitName], costs: event.target.value };
		setCalcData(dataCopy);
	}

	const handleSoldChange = (event) => {
		const splitName = event.target.name.split('-')[1];
		const dataCopy = Object.assign([], calcData);
		dataCopy[splitName] = { ...dataCopy[splitName], sold: event.target.value };
		setCalcData(dataCopy);
	}

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});

	const calculateProfit = (index) => {
		const { price, hours, checked, cph, costs, sold } = calcData[index];
		const profit = (price - (hours * (checked ? cph * 1.25 : cph)) - costs) * sold;
		calcData[index] = { ...calcData[index], profit };
		return formatter.format(profit);
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
        if (/^\d*$/gm.test(value)) {
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
                            Save/Print
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
                                    <Tooltip placement='bottom' title='Test'>
                                        <Typography
                                            className={classes.titles}
                                            variant='h5'
                                        >
                                            Package Manager <HelpOutline className={classes.helpIcon} size='large' />
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packageMngrData.map((pkg, index) => (
                                <TableRow key={`package-${index}`}>
                                    <TableCell className={classes.cell} align='center' width='5%'>
                                        <IconButton size='small'onClick={(e) => handlePackageMngrRemove(e, index)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell className={classes.cell} align='left' key={`name-${pkg.name}`} width='55%'>
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
                                    <TableCell className={classes.cell} align='left' key={`price-${pkg.name}`} width='40%'>
                                        <TextField
                                            variant='outlined'
                                            size='large'
                                            label='Price'
                                            defaultValue={pkg.price}
                                            name={`price-${index}`}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
                                    <Tooltip placement='top' title='Test'>
                                        <Typography
                                            className={classes.titles}
                                            variant='h5'
                                        >
                                            Service Manager <HelpOutline className={classes.helpIcon} size='large' />
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {serviceMngrData.map((pkg, index) => (
                                <TableRow key={`package-${index}`}>
                                    <TableCell className={classes.cell} align='center' width='5%'>
                                        <IconButton size='small'onClick={(e) => handleServiceMngrRemove(e, index)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell className={classes.cell} align='left' key={`name-${pkg.name}`}>
                                        <TextField
                                            variant='outlined'
                                            size='large'
                                            label='Description'
                                            defaultValue={pkg.name}
                                            name={`name-${index}`}
                                            onChange={handleServiceNameInput}
                                            fullWidth
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
                                    <Tooltip placement='top' title='Test'>
                                        <Typography
                                            className={classes.titles}
                                            variant='h5'
                                        >
                                            Additional Offers Manager <HelpOutline className={classes.helpIcon} size='large' />
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addonMngrData.map((value, index) => (
                                <TableRow key={`package-${index}`}>
                                    <TableCell className={classes.cell} align='center' width='5%'>
                                        <IconButton size='small'onClick={(e) => handleAddonMngrRemove(e, index)}>
                                            <Delete />
                                        </IconButton>
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
                                    <TableCell className={classes.cell} align='center' key={`price-${index}`} width='15%'>
                                            <TextField
                                                variant='outlined'
                                                label='Price'
                                                defaultValue={value.price}
                                                name={`price-${index}`}
                                                fullWidth
                                                error={errors[`price-${index}`] === true}
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
                                    <Tooltip placement='top-start' title='Test'>
                                        <Typography
                                            className={classes.tableTitles}
                                            variant='h5'
                                        >
                                            Services <HelpOutline className={classes.helpIcon} size='large' />
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                                {packageVwrData.map((pkg, index) => (
                                    <TableCell className={classes.cell} align='center' key={`name-${pkg.name}`}>
                                        <Typography name={`name-${index}`}>{pkg.name}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                {packageVwrData.map((pkg, index) => (
                                    <TableCell className={classes.titleCell} align='center' key={`price-${pkg.name}`}>
                                        <Typography name={`price-${index}`}>${pkg.price}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {serviceVwrData.map((value, index) => (
                                <TableRow key={`row-${index}`}>
                                    <TableCell className={classes.cell} component='th' align='left' width='30%'>
                                        <Typography name={`name-${index}`}>{value.name}</Typography>
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
                                    <Tooltip placement='top-start' title='Test'>
                                        <Typography
                                            className={classes.tableTitles}
                                            variant='h5'
                                        >
                                            Additional Offers <HelpOutline className={classes.helpIcon} size='large' />
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                                {packageVwrData.map((pkg, index) => (
                                    <TableCell className={classes.cell} align='center' key={`name-${pkg.name}`}>
                                        <Typography name={`name-${index}`}>{pkg.name}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                {packageVwrData.map((pkg, index) => (
                                    <TableCell className={classes.titleCell} align='center' key={`price-${pkg.name}`}>
                                        <Typography name={`price-${index}`}>${pkg.price}</Typography>
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
                                        <Typography name={`name-${index}`}>{value.name}</Typography>
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
                                    <Tooltip placement='top-start' title='Test'>
                                        <Typography
                                            className={classes.tableTitles}
                                            variant='h5'
                                        >
                                            Calculations <HelpOutline className={classes.helpIcon} size='large' />
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className={classes.titleCell} align='center'>
                                    <Typography>
                                        Price
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.titleCell} align='center'>
                                    <Typography>
                                        Hours
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.titleCell} align='center'>
                                    <Typography>
                                        Employee*
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.titleCell} align='center'>
                                    <Typography>
                                        Cost per Hour
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.titleCell} align='center'>
                                    <Typography>
                                        Other Costs
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.titleCell} align='center'>
                                    <Typography>
                                        Amount Sold	
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
                                            {item.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align='center' width='11%'>
                                        <Typography>
                                            ${item.price}
                                        </Typography>
                                    </TableCell>
                                    <TableCell width='11%'>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            label='Hours'
                                            defaultValue={0}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            name={`hours-${index}`}
                                            onChange={handleHoursChange}
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
                                            label='Cost per Hour'
                                            defaultValue={0}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            name={`cph-${index}`}
                                            InputProps={{
                                                startAdornment: <InputAdornment position='start'>$</InputAdornment>
                                            }}
                                            onChange={handleCPHChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell width='11%'>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            label='Other Costs'
                                            defaultValue={0}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            name={`costs-${index}`}
                                            InputProps={{
                                                startAdornment: <InputAdornment position='start'>$</InputAdornment>
                                            }}
                                            onChange={handleCostsChange}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell width='11%'>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            label='Amount Sold'
                                            defaultValue={0}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            name={`sold-${index}`}
                                            onChange={handleSoldChange}
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
                                        onChange={(event) => setGoalData(Number(event.target.value))}
                                        inputProps={{
                                            style: { textAlign: 'right' },
											inputMode: 'numeric',
											pattern: '[0-9]*',
                                        }}
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