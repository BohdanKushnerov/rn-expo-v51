import { useOrderDetails, useUpdateOrder } from "@/api/orders";
import { orderStatusList } from "@/assets/data/orderStatusList";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";
import { Colors } from "@/constants/Colors";
import { OrderStatus } from "@/types/OrderStatus";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();

  if (!idString) {
    return <Text>Invalid product ID</Text>;
  }

  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, error, isLoading } = useOrderDetails(id);
  const {
    mutate: updateOrder,
    error: updateOrderError,
    isPending: isUpdatingOrder,
  } = useUpdateOrder();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !order) {
    return <Text>Failed to fetch order</Text>;
  }

  const updateOrderStatus = (status: OrderStatus) => {
    updateOrder({
      id,
      status,
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      {updateOrderError && <Text>Error updating status</Text>}

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {orderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateOrderStatus(status)}
                  disabled={isUpdatingOrder}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                  {isUpdatingOrder && order.status === status && (
                    <ActivityIndicator />
                  )}
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});
