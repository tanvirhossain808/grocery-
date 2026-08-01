"use client";
import AddressCard from "@/app/components/AddressCard";
import AddressForm from "@/app/components/AddressForm";
import Loading from "@/app/components/Loading";
import api from "@/app/config/api";
import { useAuthContext } from "@/app/context/authContext";
import { Address } from "@/app/types";
import { dummyAddressData } from "@/public/grocery-assets/assets";
import { Button } from "@heroui/react";
import { MapPinIcon, PlusIcon } from "lucide-react";
import React, { SubmitEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddressPage = () => {
  const { updateUser } = useAuthContext();
  const [address, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    label: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
  });
  const resetForm = () => {
    setForm({
      label: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false,
    });
    setShowForm(false);
    setEditingId(null);
  };
  const getLocation = (retries = 3): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return Promise.reject(
          new Error("Geolocation is not supported by this browser."),
        );
      }
      const attempt = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            if (retries > 0) {
              retries--;
              setTimeout(attempt, 1000); // Retry after 1 second
            } else {
              reject(
                new Error(
                  "Unable to retrieve your location after multiple attempts. Please ensure location services are enabled and try again.",
                ),
              );
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 600000, // 10 minutes
          },
        );
      };
      attempt();
    });
  };
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      const coords = await getLocation();
      console.log("coords", coords);
      const payload = { ...form, ...coords };
      if (editingId) {
        const { data } = await api.put(`/addresses/${editingId}`, payload);
        setAddresses(data.addresses);
        updateUser({ addresses: data.addresses });
        toast.success("Address updated successfully");
      } else {
        const { data } = await api.post("/addresses", payload);
        setAddresses(data.addresses);
        updateUser({ addresses: data.addresses });
        toast.success("Address added successfully");
      }
      resetForm();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  const onEditHandler = (add: Address) => {
    setForm({
      label: add.label,
      address: add.address,
      city: add.city,
      state: add.state,
      zip: add.zip,
      isDefault: add.isDefault,
    });
    setEditingId(add.id);
    setShowForm(true);
  };
  useEffect(() => {
    api
      .get("/addresses")
      .then(({ data }) => setAddresses(data.addresses))
      .catch((error: any) => {
        toast.error(error?.response?.data?.message || error?.message);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl  font-semibold text-app-green">
            My Addresses
          </h1>
          <Button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="px-4 py-2 bg-app-green text-white text-sm font-semibold rounded-xl hover:bg-app-green-light transition-colors flex items-center gap-2"
          >
            <PlusIcon className="size-4" />
            Add Address
          </Button>
        </div>
        {/* Form modal */}
        {showForm && (
          <AddressForm
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            form={form}
            setForm={setForm}
            editingId={editingId}
          />
        )}
        {loading ? (
          <Loading />
        ) : address.length === 0 ? (
          <div className="text-center py-16">
            <MapPinIcon className="size-16 text-app-border mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-app-green mb-2">
              No address saved
            </h2>
            <p className="text-sm text-app-text-light">
              Add and address for faster checkout
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {address.map((add) => (
              <AddressCard
                key={add.id}
                addr={add}
                onEditHandler={onEditHandler}
                setAddresses={setAddresses}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressPage;
