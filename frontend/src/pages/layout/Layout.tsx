import { useState, useMemo, useEffect } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { Box, Button, HStack, Flex, Spacer, Text, Menu, MenuButton, MenuList, MenuItem, VStack } from "@chakra-ui/react";
import { AccessToken, Claim, useFetchSWR } from "../../api";
import LayoutUserMenu from "../../components/LayoutUserMenu";

// import github from "../../assets/github.svg";
import styles from "./Layout.module.css";

const Layout = () => {
    const [loginUser, setLoginUser] = useState<string>("");

    // const userData = useFetchSWR("http://localhost:6055/get-user");
    const userData = "kobayashi@ms.iss2tf.com";

    // useEffect(() => {
    //     setLoginUser(userData.data?.user);
    // }, [userData]);

    const getLoginUserName = async () => {
        const loginUser: string = "";

        try {
            const result = await fetch("/.auth/me");

            const response: AccessToken[] = await result.json();
            const loginUserClaim = response[0].user_claims.find((claim: Claim) => claim.typ === "preferred_username");
            if (loginUserClaim) setLoginUser(loginUserClaim.val);
            else setLoginUser(response[0].user_id);
        } catch (e) {
            // setLoginUser("anonymous");
            //テスト期間中はこのデータを使用する
            setLoginUser("kobayashi@ms.iss2tf.com");
        }
    };

    const usageData = useFetchSWR(`http://localhost:6055/get-usage?username=${loginUser}`);

    const trimUsername = (username: string) => {
        return username.replace("@ms.iss2tf.com", "");
    };

    getLoginUserName();

    return (
        // <ChakraProvider>
        <Box display="flex" flexDirection="column" height="auto" bg="gray.100" minH={"100%"}>
            {/* <header className={styles.header} role={"banner"}> */}
            <Box bgGradient={"linear(to-t, blue.100, teal.400)"} height={"80px"} p={4} borderBottomRadius="20px">
                <Flex>
                    <Link to="/" className={styles.headerTitleContainer}>
                        <Box>
                            <Text bg="white" bgClip="text" fontSize="2xl" fontWeight="extrabold">
                                ISS2 ChatGPT
                            </Text>
                        </Box>
                    </Link>
                    <Spacer />
                    <HStack>
                        <NavLink to="/">
                            <Button variant="ghost" color="gray.700">
                                チャット
                            </Button>
                        </NavLink>
                        <NavLink to="/docsearch">
                            <Button variant="ghost" color="gray.700">
                                ドキュメント検索
                            </Button>
                        </NavLink>
                        <NavLink to="/history">
                            <Button variant="ghost" color="gray.700">
                                履歴
                            </Button>
                        </NavLink>
                    </HStack>
                    <Spacer />

                    <VStack alignItems={"flex-start"} spacing={1}>
                        <LayoutUserMenu usageData={usageData.data}>{trimUsername(loginUser)}</LayoutUserMenu>
                        {/* <Box borderRadius="lg" bg="orange.300" p={1}>
                            <Text fontSize={"xs"}>Token数：{usage.data["3.5"]}</Text>

                        </Box> */}
                    </VStack>
                    {/* <h3 className={styles.headerTitleRight}></h3> */}
                </Flex>
            </Box>
            {/* </header> */}

            <Outlet />
        </Box>
        // </ChakraProvider>
    );
};

export default Layout;
