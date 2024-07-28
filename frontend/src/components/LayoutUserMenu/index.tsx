import { Box, Button, Popover, PopoverTrigger, Portal, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, Text } from "@chakra-ui/react";
import UsageProgressBar from "../UsageProgressBarProps";
import { List } from "@fluentui/react";

interface UserMenuProps {
    children: React.ReactNode;
    usageData: List;
}

const LayoutUserMenu: React.FC<UserMenuProps> = ({ children, usageData }) => {
    const getPropByVersion = (version: number) => {
        const ret = usageData.find((item: number) => item.version == version);
        return { value: ret?.total_tokens, limit: ret?.limit };
    };

    return (
        <Popover closeOnBlur={true} closeOnEsc={true}>
            <PopoverTrigger>
                <Button variant="unstyled" color="gray.600" fontWeight={"bold"} fontSize={"lg"} mx={2}>
                    {children}
                </Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverBody>
                        <UsageProgressBar label="Token 使用量" {...getPropByVersion(3.5)} />
                        <UsageProgressBar label="Token 使用量（4.0）" {...getPropByVersion(4.0)} />
                    </PopoverBody>
                    <PopoverFooter cursor="pointer" onClick={() => window.close()}>
                        <Text color="blue.600" fontSize="md">
                            詳細
                        </Text>
                    </PopoverFooter>
                </PopoverContent>
            </Portal>
        </Popover>
    );
};

export default LayoutUserMenu;
