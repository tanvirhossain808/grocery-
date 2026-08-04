import { Button } from "@heroui/react";
import { XIcon } from "lucide-react";
import React from "react";

const AddressForm = ({
  resetForm,
  handleSubmit,
  form,
  setForm,
  editingId,
}: any) => {
  return (
    <>
      {/* overlay */}
      <div className="fixed inset-0 bg-black/40 z-50" />
      {/* form container */}
      <div onClick={resetForm} className="fixed inset-0 z-50 flex-center p-4">
        <form
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl p-6 w-full max-w-lg animate-fade-in"
        >
          {/* form header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-app-green">
              {editingId ? "Edit Address" : "New Address"}
            </h2>
            <Button
              type="button"
              onClick={resetForm}
              isIconOnly
              className="p-2 bg-inherit text-black hover:bg-app-cream rounded-lg"
            >
              <XIcon className="size-5" />
            </Button>
          </div>
          {/* input fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-app-green mb-1.5 ">
                Label
              </label>
              <input
                required
                type="text"
                placeholder="Home,Work,etc."
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                value={form.label}
                onChange={(e) =>
                  setForm((pre: any) => {
                    return { ...pre, label: e.target.value };
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-app-green mb-1.5 ">
                Street Address
              </label>
              <input
                required
                type="text"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                value={form.address}
                onChange={(e) =>
                  setForm((pre: any) => {
                    return { ...pre, address: e.target.value };
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="">
                <label className="block text-sm font-medium text-app-green mb-1.5 ">
                  City
                </label>
                <input
                  required
                  type="text"
                  placeholder="Home,Work,etc."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                  value={form.city}
                  onChange={(e) =>
                    setForm((pre: any) => {
                      return { ...pre, city: e.target.value };
                    })
                  }
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium text-app-green mb-1.5 ">
                  State
                </label>
                <input
                  required
                  type="text"
                  placeholder="Home,Work,etc."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                  value={form.state}
                  onChange={(e) =>
                    setForm((pre: any) => {
                      return { ...pre, state: e.target.value };
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="">
                <label className="block text-sm font-medium text-app-green mb-1.5 ">
                  Zip Code
                </label>
                <input
                  required
                  type="text"
                  placeholder="Home,Work,etc."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                  value={form.zip}
                  onChange={(e) =>
                    setForm((pre: any) => {
                      return { ...pre, zip: e.target.value };
                    })
                  }
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="block text-sm font-medium text-app-green mb-1.5">
                  <input
                    type="checkbox"
                    checked={form.isDefault}
                    onChange={(e) =>
                      setForm({ ...form, isDefault: e.target.checked })
                    }
                  />
                  <span className="text-sm text-app-text">Set as default</span>
                </label>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="mt-6 w-full py-3 bg-app-green text-white font-semibold rounded-xl hover:bg-app-green-light transition-colors"
          >
            {editingId ? "Update Address" : "Save Address"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddressForm;
