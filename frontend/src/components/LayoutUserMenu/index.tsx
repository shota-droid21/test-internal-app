import { Box, Button, IconButton, Popover, PopoverTrigger, Portal, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, Text } from "@chakra-ui/react";
import UsageProgressBar from "../UsageProgressBarProps";
import { List } from "@fluentui/react";
import AccountCircle from "@mui/icons-material/AccountCircle";

interface UserMenuProps {
    usageData: any[];
    userName: String;
}

const LayoutUserMenu: React.FC<UserMenuProps> = ({ usageData, userName }) => {
    const getPropByVersion = (version: string) => {
        const ret = usageData.find((item: any) => item.gpt_model == version);
        return { value: ret?.total_tokens, limit: ret?.limit };
    };

    return (
        <Popover closeOnBlur={true} closeOnEsc={true}>
            <PopoverTrigger>
                {/* <Button variant="unstyled" color="blue.800" fontWeight={"bold"} fontSize={"lg"} mx={2}>
                    {children}
                </Button> */}
                <IconButton
                    //   colorScheme='gray.500'
                    color={"white"}
                    aria-label="User Icon"
                    icon={<AccountCircle />}
                    mr={2}
                    variant="ghost"
                    size="lg"
                />
                {/* <MenuButton color={color} mr={2} as={IconButton} aria-label="Options" icon={<AccountCircle />} variant="ghost" /> */}
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverHeader py={4}>
                        <Text fontWeight="bold" fontSize="lg" color="blue.400">
                            {userName}
                        </Text>
                    </PopoverHeader>
                    <PopoverBody>
                        <UsageProgressBar label="Token 使用量（3.5）" {...getPropByVersion("gpt-3.5-turbo")} />
                        {/* <UsageProgressBar label="Token 使用量（gpt-3.5-turbo-16k）" {...getPropByVersion("gpt-3.5-turbo-16k")} /> */}
                        <UsageProgressBar label="Token 使用量（4o）" {...getPropByVersion("gpt-4o")} />
                    </PopoverBody>
                    <PopoverFooter cursor="pointer" onClick={() => window.close()}>
                        <Text color="gray.700" fontSize="sm">
                            アカウント詳細
                        </Text>
                    </PopoverFooter>
                </PopoverContent>
            </Portal>
        </Popover>
    );
};

export default LayoutUserMenu;
