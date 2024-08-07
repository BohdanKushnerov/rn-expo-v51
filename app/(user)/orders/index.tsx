import { useMyOrderList } from "@/api/orders";
import { useUpdateUserOrdersSubscription } from "@/api/orders/subscriptions";
import OrderListItem from "@/components/OrderListItem";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function OrdersScreen() {
  const { data: orders, error, isLoading } = useMyOrderList();

  useUpdateUserOrdersSubscription();

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
