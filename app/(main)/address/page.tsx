"use client";
import AddressCard from "@/app/components/AddressCard";
import AddressForm from "@/app/components/AddressForm";
import Loading from "@/app/components/Loading";
import { Address } from "@/app/types";
import { dummyAddressData } from "@/public/grocery-assets/assets";
import { Button } from "@heroui/react";
import { MapPinIcon, PlusIcon } from "lucide-react";
import React, { SubmitEvent, useEffect, useState } from "react";

const AddressPage = () => {
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
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
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
    setEditingId(add._id);
    setShowForm(true);
  };
  useEffect(() => {
    setAddresses(dummyAddressData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
                key={add._id}
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
