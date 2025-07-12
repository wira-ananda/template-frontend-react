import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Avatar, Dropdown, Flex, Badge } from "antd";
import { useGlobalContext } from "../../hooks/context/useGlobalContext";
import { Icon } from "@iconify/react";
// import { useGetProfileByUserId } from "../../fetching/useFetchQuery";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const { drawerOpen, setDrawerOpen, isMobile, userId, logout } =
    useGlobalContext();
  // const { data, isLoading, error } = useGetProfileByUserId(userId);
  const data = {
    username: "Wira Ananda",
    email: "wira@monochromeboy.id",
  };

  const navigate = useNavigate();

  const toProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="w-full z-30 flex p-1 bg-gray-100">
      {isMobile ? (
        <Button
          type="text"
          icon={drawerOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setDrawerOpen(!drawerOpen)}
          style={{
            fontSize: "20px",
            width: 50,
            height: 50,
          }}
        />
      ) : (
        <></>
      )}

      <div className="w-full h-full space-x">
        <div className="w-[99%] flex items-center justify-end">
          {/* <Badge size="small" count={5}>
            <Button
              icon={
                <Icon
                  icon="duo-icons:bell"
                  className="text-primary-darker"
                  width="18"
                  height="18"
                />
              }
            />
          </Badge> */}
          <Dropdown
            menu={{
              items: [
                {
                  key: "profile",
                  label: "Profile",
                  icon: <Icon icon="bx:bx-user" style={{ color: "#6b7280" }} />,
                  onClick: toProfile,
                },
                {
                  type: "divider",
                },
                {
                  key: "logout",
                  label: "Logout",
                  icon: (
                    <Icon icon="hugeicons:login-02" width="18" height="18" />
                  ),
                  danger: true,
                  onClick: logout,
                },
              ],
            }}
          >
            <Flex
              align="center"
              gap={8}
              style={{ cursor: "pointer", marginLeft: 18 }}
            >
              <Avatar shape="square" className="bg-primary-main text-white">
                {data?.username ? data?.username.charAt(0).toUpperCase() : "O"}
              </Avatar>

              <Flex vertical className="my-2">
                <div className="text-sm mt-2 font-semibold ">
                  {data?.username ?? "Pengguna Tanpa Nama"}
                </div>
                <div className="text-xs  mb-3 font-medium text-gray-600">
                  {data?.email}
                </div>
              </Flex>
            </Flex>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
