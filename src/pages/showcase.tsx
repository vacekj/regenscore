import { Check } from '@/components/Check';
import { Button, Container, Grid, Heading, GridItem } from '@chakra-ui/react';

export default function Showcase() {
	return (
		<Container>
			<Button variant='brand'>connect wallet</Button>
			<Button variant='variant1'>connect wallet</Button>
			<Button variant='variant2'>connect wallet</Button>
			<Heading as='h1' variant='h1'>
				Heading H1
			</Heading>
			<Heading as='h2' variant='h2'>
				Heading H2
			</Heading>
			<Heading as='h3' variant='h3'>
				Heading H3
			</Heading>
			<p>
				Here is our{' '}
				<a className='my-link' href='https://example.com'>
					link!
				</a>
			</p>
			<Check status={'NOT_STARTED'} /> <label>NOT_STARTED</label>
			<Check status={'IN_PROGRESS'} /> <label>IN_PROGRESS</label>
			<Check status={'SUCCESS'} /> <label>SUCCESS</label>
			<Check status={'ERROR'} /> <label>ERROR</label>
			<Check status={'WARNING'} /> <label>WARNING</label>
			<Grid
				gridTemplateRows={''}
				gridTemplateColumns={'7fr 3fr 2fr'}
				h='200px'
				bg=''
			>
				<GridItem pl='2' bg='orange.300'>
					RegenScore
				</GridItem>
				<GridItem pl='2' bg='pink.300'>
					About US
				</GridItem>
				<GridItem pl='2' bg='green.300'>
					Help & Support
				</GridItem>
			</Grid>
		</Container>
	);
}
