'use client'
import {
IconBook,
IconChartPie3,
IconChevronDown,
IconCode,
IconCoin,
IconFingerprint,
IconNotification,
} from '@tabler/icons-react';
import {
Anchor,
Box,
Burger,
Button,
Center,
Collapse,
Divider,
Drawer,
Group,
HoverCard,
ScrollArea,
SimpleGrid,
Text,
ThemeIcon,
UnstyledButton,
useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '../style/HeaderMegaMenu.module.css';
import { useState } from 'react'; 
import LoginForm from './loginform';

const mockdata = [
{
icon: IconCode,
title: 'Open source',
description: 'This Pokémon’s cry is very loud and distracting',
},
{
icon: IconCoin,
title: 'Free for everyone',
description: 'The fluid of Smeargle’s tail secretions changes',
},
{
icon: IconBook,
title: 'Documentation',
description: 'Yanma is capable of seeing 360 degrees without',
},
{
icon: IconFingerprint,
title: 'Security',
description: 'The shell’s rounded shape and the grooves on its.',
},
{
icon: IconChartPie3,
title: 'Analytics',
description: 'This Pokémon uses its flying ability to quickly chase',
},
{
icon: IconNotification,
title: 'Notifications',
description: 'Combusken battles with the intensely hot flames it spews',
},
];

export function HeaderMegaMenu() {
const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
const [loginFormVisible, setLoginFormVisible] = useState(false); 
const theme = useMantineTheme();

const links = mockdata.map((item) => (
<UnstyledButton className={classes.subLink} key={item.title}>
    <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
            <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
            <Text size="sm" fw={500}>
                {item.title}
            </Text>
            <Text size="xs" c="dimmed">
                {item.description}
            </Text>
        </div>
    </Group>
</UnstyledButton>
));

const openLoginForm = () => setLoginFormVisible(true); 
const closeLoginForm = () => setLoginFormVisible(false); 

return (
<Box pb={120}>
    <header className={classes.header}>
        <Group justify="space-between" h="100%">
            <MantineLogo size={30} />

            <Group h="100%" gap={0} visibleFrom="sm">
                <a href="#" className={classes.link}>
                    Home
                </a>
                <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                    <HoverCard.Target>
                        <a href="#" className={classes.link}>
                            <Center inline>
                                <Box component="span" mr={5}>
                                    Features
                                </Box>
                                <IconChevronDown size={16} color={theme.colors.blue[6]} />
                            </Center>
                        </a>
                    </HoverCard.Target>

                    <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                        <Group justify="space-between" px="md">
                            <Text fw={500}>Features</Text>
                            <Anchor href="#" fz="xs">
                                View all
                            </Anchor>
                        </Group>

                        <Divider my="sm" />

                        <SimpleGrid cols={2} spacing={0}>
                            {links}
                        </SimpleGrid>

                        <div className={classes.dropdownFooter}>
                            <Group justify="space-between">
                                <div>
                                    <Text fw={500} fz="sm">
                                        Get started
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        Their food sources have decreased, and their numbers
                                    </Text>
                                </div>
                                <Button variant="default">Get started</Button>
                            </Group>
                        </div>
                    </HoverCard.Dropdown>
                </HoverCard>
                <a href="#" className={classes.link}>
                    Learn
                </a>
                <a href="#" className={classes.link}>
                    Academy
                </a>
            </Group>

            <Group visibleFrom="sm">
                <Button variant="default" onClick={openLoginForm}>Log in</Button> 
                <Button>Sign up</Button>
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
    </header>

    {loginFormVisible && (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                zIndex: 9999,
                padding: '20px',
                width: '400px',
                borderRadius: '8px',
            }}
        >
            <LoginForm onClose={closeLoginForm} />
        </div>
    )}

    <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
    >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
            <Divider my="sm" />

            <a href="#" className={classes.link}>
                Home
            </a>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
                <Center inline>
                    <Box component="span" mr={5}>
                        Features
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />
                </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>
            <a href="#" className={classes.link}>
                Learn
            </a>
            <a href="#" className={classes.link}>
                Academy
            </a>

            <Divider my="sm" />

            <Group justify="center" grow pb="xl" px="md">
                <Button variant="default">Log in</Button>
                <Button>Sign up</Button>
            </Group>
        </ScrollArea>
    </Drawer>
</Box>
);
}
