import { useAdminOrderList } from "@/api/orders";
import OrderListItem from "@/components/OrderListItem";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function OrderScreen() {
  const {
    data: orders,
    error,
    isLoading,
  } = useAdminOrderList({ archived: false });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch orders</Text>;
  }

  return (
    <FlatList
      data={orders}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      renderItem={({ item }) => <OrderListItem order={item} />}
    />
  );
}
