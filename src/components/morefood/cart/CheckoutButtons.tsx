import { Button } from '@/components/ui/button';
import { useFetchRestaurant } from '@/lib/action/morefood/restaurantlist';
import { useAppSelector } from '@/lib/redux/hooks';
import { RootState } from '@/lib/redux/store';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

const CheckoutButtons = () => {
    const { fetchResturantDetails } = useFetchRestaurant();
    const product = useAppSelector((state: RootState) => state.foodCart);
    const delivery = useAppSelector((state: RootState) => state.delivery);

    const totalItems = [...product.items, ...product.exclusiveOffers].reduce(
        (total, item) => total + (item.quantity || 0),
        0
    );

    const subtotal = [...product.items, ...product.exclusiveOffers].reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 0),
        0
    );

    const total = subtotal;

    const { data: resDetail, isLoading, isError } = useQuery({
        queryKey: ["restaurant Details", product.restaurant_slug],
        queryFn: async () => fetchResturantDetails(product.restaurant_slug),
        staleTime: 360000,
        enabled: Boolean(product.restaurant_slug)
    });

    if (totalItems === 0) {
        return (
            <Button variant="morefoodPrimary" disabled className="mt-4 w-full py-3 rounded-lg text-lg">
                Checkout
            </Button>
        );
    }

    

    if (isLoading) {
        return (
            <Button variant="morefoodPrimary" disabled className="mt-4 w-full py-3 rounded-lg text-lg">
                Loading...
            </Button>
        );
    }

    if (isError || !resDetail) {
        return (
            <Button variant="morefoodPrimary" disabled className="mt-4 w-full py-3 rounded-lg text-lg">
                Checkout
            </Button>
        );
    }

    if (!resDetail.open_hrs) {
        return (
            <Button variant="morefoodPrimary" disabled className="mt-4 w-full py-3 rounded-lg text-lg">
                Restaurant is closed
            </Button>
        );
    }

    if (delivery?.deliverytype !== "delivery") {
        return (
            <Link href="/morefood/checkout">
                <Button variant="morefoodPrimary" className="mt-4 w-full py-3 rounded-lg text-lg">
                    Checkout
                </Button>
            </Link>
        );
    }

    if (resDetail.min_order > total && delivery?.deliverytype === "delivery") {
        return (
            <Button variant="morefoodPrimary" disabled className="mt-4 w-full py-3 rounded-lg text-lg">
                Order must be more than {resDetail.currency_symbol}{resDetail.min_order}
            </Button>
        );
    }

    return (
        <Link href="/morefood/checkout">
            <Button variant="morefoodPrimary" className="mt-4 w-full py-3 rounded-lg text-lg">
                Checkout
            </Button>
        </Link>
    );
};

export default CheckoutButtons;
