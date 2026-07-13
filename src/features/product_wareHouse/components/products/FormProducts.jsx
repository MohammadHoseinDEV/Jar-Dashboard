import { useEffect, useState } from 'react';

import { useGetProfile } from '../../../../hooks/profile/profile';
import { useShowSignutare } from '../../Api/productsApi';
import { toShamsi } from '../../../../Time/date';
import API_HOST from '../../../../../API/api';

import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';

function FormProducts({
  openForm,
  setOpenForm,
  setSelectedProducts,
  seledtedProducts,
}) {
  const img = seledtedProducts?.certificateImagePath
    ? `${API_HOST}:5258/${seledtedProducts.certificateImagePath}`
    : null;

  const closeHandler = () => {
    setOpenForm(false);
    setSelectedProducts(null);
  };

  const { data } = useGetProfile();

  const showSignature = useShowSignutare();

  return (
    <div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
          openForm
            ? 'pointer-events-auto opacity-100 '
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={closeHandler}
        />

        <div
          className={`relative transform rounded-[15px] bg-white text-white shadow-2xl transition-all duration-300 ${
            openForm
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="scale-45">
            <button
              onClick={closeHandler}
              className="mb-5 cursor-pointer rounded-[10px] bg-black/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-white"
            >
              <img
                src={close}
                alt="close"
                width={40}
                className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
              />
            </button>
            <div
              className="border border-black bg-white text-black"
              style={{ width: '210mm', minHeight: '294mm' }}
            >
              <div className="grid grid-cols-5 border-b">
                <p
                  className="flex flex-col justify-center space-y-2 border-l pl-1"
                  dir="ltr"
                >
                  <span className="font-[AvenirLTProMedium]">
                    Doc no : S0701
                  </span>
                  <span className="font-[AvenirLTProMedium]">Rev no : 01</span>
                  <span className="font-[AvenirLTProMedium]">
                    Date : {toShamsi(seledtedProducts?.createdAt)}
                  </span>
                </p>
                <p className="col-span-3 flex items-center justify-center border-l text-[18px] font-extrabold">
                  PACKAGING STANDARD
                </p>
                <p className="flex flex-col items-center justify-center">
                  <img src={logo} alt="logo" className="h-18.5 pl-2" />
                  <span className="text-[18px] font-extrabold">SACHI</span>
                </p>
              </div>
              <div className="grid grid-cols-5">
                {/* Right Form */}
                <div className="text-center">
                  <p className="border-b border-l py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                    {seledtedProducts?.numberOfBottlesInPallet}
                  </p>
                  <p className="border-b border-l py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                    {seledtedProducts?.numberOfLayers}
                  </p>
                  <p className="border-b border-l py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                    {seledtedProducts?.bottlesPerLayer}
                  </p>
                  <p className="border-b border-l py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                    {seledtedProducts?.typeOfArrangement}
                  </p>
                  <p className="border-b border-l py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                    {seledtedProducts?.topLayerPosition}
                  </p>
                  <p className="border-b border-l py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                    {seledtedProducts?.bottomLayerPosition}
                  </p>
                  <p className="border-b border-l py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                    {seledtedProducts?.separatorLayer}
                  </p>
                </div>
                {/* Middle Form */}
                <div className="col-span-3 border-l">
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col text-left">
                      <p className="border-b bg-black/20 py-1 pl-1 text-[13px]">
                        Number of bottles in the pallet
                      </p>
                      <p className="border-b bg-black/20 py-1 pl-1 text-[13px]">
                        Number Of layers
                      </p>
                      <p className="border-b bg-black/20 py-1 pl-1 text-[13px]">
                        bottels per layer
                      </p>
                      <p className="border-b bg-black/20 py-1 pl-1 text-[13px]">
                        Type of arrangement
                      </p>
                      <p className="border-b bg-black/20 py-1 pl-1 text-[13px]">
                        Layer on the Top
                      </p>
                      <p className="border-b bg-black/20 py-1 pl-1 text-[13px]">
                        Layer at the bottom
                      </p>
                      <p className="border-b bg-black/20 py-1 pl-1 text-[13px]">
                        Seperator layer
                      </p>
                    </div>
                    <div className="text-center" dir="ltr">
                      <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.productCode}
                      </p>
                      <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.productName}
                      </p>
                      <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.market}/{seledtedProducts?.customer}
                      </p>
                      <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.brimfulCapacity.toLocaleString()}
                        cc
                      </p>
                      <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.weight} g
                      </p>
                      <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.diameter} mm
                      </p>
                      <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.height} mm
                      </p>
                      <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.color
                          ? seledtedProducts.color.charAt(0).toUpperCase() +
                            seledtedProducts.color.slice(1)
                          : ''}
                      </p>
                      <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.finish}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Left Form */}
                <div className="bg-black/20 text-left">
                  <p className="border-b py-1 pl-1 text-[13px]">Product Code</p>
                  <p className="border-b py-1 pl-1 text-[13px]">Product Name</p>
                  <p className="border-b py-1 pl-1 text-[13px]">
                    Market / Customer
                  </p>
                  <p className="grid grid-cols-3">
                    <span className="col-span-2 flex flex-col justify-center">
                      <span className="border-b py-1 pl-1 text-[13px]">
                        Brimful capacity
                      </span>
                      <span className="border-b py-1 pl-1 text-[13px]">
                        Weight
                      </span>
                      <span className="border-b py-1 pl-1 text-[13px]">
                        Diameter
                      </span>
                      <span className="border-b py-1 pl-1 text-[13px]">
                        Height
                      </span>
                      <span className="border-b py-1 pl-1 text-[13px]">
                        colour
                      </span>
                      <span className="border-b py-1 pl-1 text-[13px]">
                        finish
                      </span>
                    </span>
                    <span className="flex items-center justify-center border-r border-b text-center text-[13px]">
                      product Data
                    </span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="border-b">
                  <p className="fixed top-110 right-15 text-center text-[50px]">
                    عکس محصول
                  </p>
                </div>
                <div className="grid grid-cols-10">
                  <div className="col-span-6 border-l text-center" dir="ltr">
                    <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[11px]">
                      {seledtedProducts?.palletDimensionLength} x
                      {seledtedProducts?.palletDimensionWidth} x
                      {seledtedProducts?.palletDimensionHeight} mm
                    </p>
                    <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[11px]">
                      {seledtedProducts?.palletVolume} m3
                    </p>
                    <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[11px]">
                      {seledtedProducts?.palletTotalWeight} kg
                    </p>
                    <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[11px]">
                      {seledtedProducts?.palletBottlesWeight} kg
                    </p>
                    <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[11px]">
                      {seledtedProducts?.palletPackingWeight} kg
                    </p>
                    <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[11px]">
                      {seledtedProducts?.numberOfBottlesIn1Ton}
                    </p>
                    <p className="border-r border-b py-1 pl-1 font-[AvenirLTProMedium] text-[11px]">
                      {seledtedProducts?.numberOfBottlesIn1M3}
                    </p>
                  </div>
                  {/* left */}
                  <div className="col-span-4">
                    <div className="grid grid-cols-3 bg-black/20 text-left">
                      <div className="col-span-2" dir="ltr">
                        <p className="border-b py-1 pl-1 text-[11px]">
                          Dimension
                        </p>
                        <p className="border-b py-1 pl-1 text-[11px]">Volume</p>
                        <p className="border-b py-1 pl-1 text-[11px]">
                          Total weight
                        </p>
                        <p className="border-b py-1 pl-1 text-[11px]">
                          Weight of bottles
                        </p>
                        <p className="border-b py-1 pl-1 text-[11px]">
                          Weight of packing
                        </p>
                      </div>
                      <div className="flex items-center justify-center border-r border-b text-center text-[13px]">
                        loaded pallet
                      </div>
                      <p className="col-span-3 border-b py-1 pl-1 text-center font-[AvenirLTProMedium] text-[11px]">
                        Number of bottles in 1 ton
                      </p>
                      <p className="col-span-3 border-b py-1 pl-1 text-center font-[AvenirLTProMedium] text-[11px]">
                        Number of bottles in 1 m3
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* button */}
              <div className="border-b bg-black/20 py-1.5 text-center">
                REQUIRED PACKAGING MATERIALS FOR A PALLET
              </div>

              <div>
                <table className="w-full">
                  <thead className="w-full border-separate border-spacing-y-2 px-5">
                    <tr className="bg-black/20 text-center text-black/70">
                      <th className="border-b border-l px-3 py-1 text-[13px]">
                        UNIT
                      </th>
                      <th className="border-b border-l py-1 pr-2 pl-2 text-[13px]">
                        QUANTITY
                      </th>
                      <th className="border-b border-l px-3 py-1 text-[13px]">
                        DIMENSIONS
                      </th>
                      <th className="border-b border-l px-3 py-1 text-[13px]">
                        QUALITY
                      </th>
                      <th className="border-b px-3 py-1 text-[13px]">
                        MATERIAL
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {seledtedProducts?.packagingMaterials.map((p) => (
                      <tr key={p.id} dir="ltr">
                        <td className="border-b border-l py-1 pl-1 text-center font-[AvenirLTProMedium] text-[13px]">
                          {p.unit}
                        </td>
                        <td className="border-b border-l py-1 pl-1 text-center font-[AvenirLTProMedium] text-[13px]">
                          {p.quantity}
                        </td>
                        <td className="border-b border-l py-1 pl-1 text-center font-[AvenirLTProMedium] text-[13px]">
                          {p.dimensions}
                        </td>
                        <td className="border-b border-l py-1.5 pl-1 text-left font-[AvenirLTProMedium] text-[13px]">
                          <span> TYPE : {p.materialType}</span>
                          <br />
                          <span>{p.quality}</span>
                        </td>
                        <td className="border-b py-1 pl-1 text-left font-[AvenirLTProMedium] text-[13px]">
                          {p.materialName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div dir="ltr">
                <div className="grid grid-cols-11 bg-black/20">
                  <div className="col-span-4 border-b pt-1 pl-1 text-[13px]">
                    PREPARD BY :
                  </div>
                  <div className="col-span-2 border-b border-l pt-1 text-center text-[13px]">
                    APPROVED BY:
                  </div>
                  <div className="col-span-3 border-b border-l pt-1 text-center text-[13px]">
                    Manufacturer
                  </div>
                  <div className="col-span-2 border-b border-l pt-1 text-center text-[13px]">
                    Customer(Optional)
                  </div>
                </div>
                <div className="grid grid-cols-11">
                  <div className="col-span-4 text-[13px]">
                    <div className="flex w-full">
                      <div className="col-span-2 flex flex-col justify-center space-y-2.5 pr-5 pl-1">
                        <p>Name:</p>
                        <p>REV : </p>
                        <p>Date :</p>
                      </div>
                      <div className="col-span-3 flex w-full flex-col space-y-2 border-l py-2 text-center">
                        <p className="border-b">
                          {seledtedProducts?.preparedBy}
                        </p>
                        <p className="border-b font-[AvenirLTProMedium]">
                          {seledtedProducts?.revisionNumber}
                        </p>
                        <p className="font-[AvenirLTProMedium]">
                          {toShamsi(seledtedProducts?.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 border-l pt-1 text-center text-[13px]">
                    <p className="border-b pt-1 text-center">Date : </p>
                    <p className="pt-5 text-center">Signature :</p>
                  </div>
                  <div className="col-span-3 border-l pt-1 text-center text-[13px]">
                    <p className="border-b pt-[23px]"></p>
                    <p onClick={() => {}}>امضاء</p>
                  </div>
                  <div className="col-span-2 border-l pt-1 text-center text-[13px]">
                    <p className="border-b pt-[23px]"></p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          openForm
            ? 'pointer-events-auto opacity-100 '
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={closeHandler}
        />
        <div
          className={`relative transform rounded-[15px] bg-white p-6 text-white shadow-2xl transition-all duration-300 ${
            openForm
              ? 'translate-y-0 scale-78 opacity-100'
              : '-translate-y-10 scale-0 opacity-0'
          }`}
        >
          <div>
            <div
              className="border border-black bg-white text-black print:-mt-5 print:scale-120"
              style={{ width: '210mm', minHeight: '294mm' }}
            >
              {/* header */}
              <div className="grid grid-cols-5 border-b">
                <div className="space-y-2 border-l pl-1" dir="ltr">
                  <p className="space-x-1">
                    <span className="font-[AvenirLTProMedium]">Doc no :</span>
                    <span className="font-[AvenirLTProMedium]">S0701</span>
                  </p>
                  <p className="space-x-1">
                    <span className="font-[AvenirLTProMedium]">Rev no :</span>
                    <span className="font-[AvenirLTProMedium]">01</span>
                  </p>
                  <p className="space-x-1">
                    <span className="font-[AvenirLTProMedium]">Date :</span>
                    <span className="font-[AvenirLTProMedium]">
                      {toShamsi(seledtedProducts?.createdAt)}
                    </span>
                  </p>
                </div>
                <div className="col-span-3 flex items-center justify-center border-l text-[18px] font-extrabold">
                  PACKAGING STANDARD
                </div>
                <div className="flex items-center justify-center">
                  <img src={logo} alt="logo" width={150} />
                </div>
              </div>
              <div className="grid grid-cols-5">
                <div className="text-center">
                  <p className="flex h-[30px] items-center justify-center border-b border-l pl-1 font-[AvenirLTProMedium] text-[13px]">
                    {seledtedProducts?.numberOfBottlesInPallet}
                  </p>
                  <p className="flex h-[30px] items-center justify-center border-b border-l pl-1 font-[AvenirLTProMedium] text-[13px]">
                    {seledtedProducts?.numberOfLayers}
                  </p>
                  <p className="flex h-[30px] items-center justify-center border-b border-l pl-1 font-[AvenirLTProMedium] text-[13px]">
                    {seledtedProducts?.bottlesPerLayer}
                  </p>
                  <p className="flex h-[30px] items-center justify-center border-b border-l pl-1 font-[AvenirLTProMedium] text-[13px]">
                    {seledtedProducts?.typeOfArrangement}
                  </p>
                  <p className="flex h-[30px] items-center justify-center border-b border-l pl-1 font-[AvenirLTProMedium] text-[13px]">
                    {seledtedProducts?.topLayerPosition}
                  </p>
                  <p className="flex h-[30px] items-center justify-center border-b border-l pl-1 font-[AvenirLTProMedium] text-[13px]">
                    {seledtedProducts?.bottomLayerPosition}
                  </p>
                  <p className="flex h-[30px] items-center justify-center border-b border-l pl-1 font-[AvenirLTProMedium] text-[13px]">
                    {seledtedProducts?.separatorLayer}
                  </p>
                </div>
                <div className="col-span-3">
                  <div className="grid grid-cols-2">
                    <div dir="ltr" className="border-l">
                      <p className="flex h-[30px] items-center border-b bg-black/20 pl-1 text-[13px]">
                        Number of bottles in the pallet
                      </p>
                      <p className="flex h-[30px] items-center border-b bg-black/20 pl-1 text-[13px]">
                        Number Of layers
                      </p>
                      <p className="flex h-[30px] items-center border-b bg-black/20 pl-1 text-[13px]">
                        bottels per layer
                      </p>
                      <p className="flex h-[30px] items-center border-b bg-black/20 pl-1 text-[13px]">
                        Type of arrangement
                      </p>
                      <p className="flex h-[30px] items-center border-b bg-black/20 pl-1 text-[13px]">
                        Layer on the Top
                      </p>
                      <p className="flex h-[30px] items-center border-b bg-black/20 pl-1 text-[13px]">
                        Layer at the bottom
                      </p>
                      <p className="flex h-[30px] items-center border-b bg-black/20 pl-1 text-[13px]">
                        Seperator layer
                      </p>
                    </div>
                    <div className="border-l text-center" dir="ltr">
                      <p className="flex h-[30px] items-center justify-center border-b pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.productCode}
                      </p>
                      <p className="flex h-[30px] items-center justify-center border-b pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.productName}
                      </p>
                      <p className="flex h-[30px] items-center justify-center border-b pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.market}/{seledtedProducts?.customer}
                      </p>
                      <p className="flex h-[30px] items-center justify-center border-b pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.brimfulCapacity.toLocaleString()}
                        cc
                      </p>
                      <p className="flex h-[30px] items-center justify-center border-b pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.weight} g
                      </p>
                      <p className="flex h-[30px] items-center justify-center border-b pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.diameter} mm
                      </p>
                      <p className="flex h-[30px] items-center justify-center border-b pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.height} mm
                      </p>
                      <p className="flex h-[30px] items-center justify-center border-b pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.color
                          ? seledtedProducts.color.charAt(0).toUpperCase() +
                            seledtedProducts.color.slice(1)
                          : ''}
                      </p>
                      <p className="flex h-[30px] items-center justify-center border-b pl-1 font-[AvenirLTProMedium] text-[13px]">
                        {seledtedProducts?.finish}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="" dir="ltr">
                  <p className="flex h-[30px] items-center justify-start border-b bg-black/20 pl-1 text-[13px]">
                    Product Code
                  </p>
                  <p className="flex h-[30px] items-center justify-start border-b bg-black/20 pl-1 text-[13px]">
                    Product Name
                  </p>
                  <p className="flex h-[30px] items-center justify-start border-b bg-black/20 pl-1 text-[13px]">
                    Market / Customer
                  </p>
                  <div className="grid grid-cols-3">
                    <p className="flex items-center justify-center border-r border-b bg-black/20 px-1 text-center text-[13px]">
                      product Data
                    </p>
                    <p className="col-span-2 flex w-full flex-col bg-black/20 text-center">
                      <span className="flex h-[30px] items-center border-b pl-1 text-[13px]">
                        Brimful capacity
                      </span>
                      <span className="flex h-[30px] items-center border-b pl-1 text-[13px]">
                        Weight
                      </span>
                      <span className="flex h-[30px] items-center border-b pl-1 text-[13px]">
                        Diameter
                      </span>
                      <span className="flex h-[30px] items-center border-b pl-1 text-[13px]">
                        Height
                      </span>
                      <span className="flex h-[30px] items-center border-b pl-1 text-[13px]">
                        colour
                      </span>
                      <span className="flex h-[30px] items-center border-b pl-1 text-[13px]">
                        finish
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2">
                {/* عکس محصول */}
                <div className="border-b border-l">
                  <p className="flex items-center justify-center">
                    <img
                      src={img}
                      alt="Certificate"
                      className="fixed top-[340px] h-[250px] w-[385px] print:scale-90 print:pb-10"
                    />
                  </p>
                </div>
                <div className="grid grid-cols-5">
                  <div className="col-span-3 border-l text-center" dir="ltr">
                    <p className="border-b py-1.5 pl-1 font-[AvenirLTProMedium] text-[13px]">
                      {seledtedProducts?.palletDimensionLength}x
                      {seledtedProducts?.palletDimensionWidth}x
                      {seledtedProducts?.palletDimensionHeight}mm
                    </p>
                    <p className="flex h-[30px] items-center justify-center border-b pl-1 font-[AvenirLTProMedium] text-[11px]">
                      {seledtedProducts?.palletVolume}m3
                    </p>
                    <p className="flex h-[30px] items-center justify-center border-b pl-1 font-[AvenirLTProMedium] text-[11px]">
                      {seledtedProducts?.palletTotalWeight}kg
                    </p>
                    <p className="flex h-[30px] items-center justify-center border-b pl-1 font-[AvenirLTProMedium] text-[11px]">
                      {seledtedProducts?.palletBottlesWeight}kg
                    </p>
                    <p className="flex h-[30px] items-center justify-center border-b pl-1 font-[AvenirLTProMedium] text-[11px]">
                      {seledtedProducts?.palletPackingWeight}kg
                    </p>
                    <p className="flex h-[30px] items-center justify-center border-b pl-1 font-[AvenirLTProMedium] text-[11px]">
                      {seledtedProducts?.numberOfBottlesIn1Ton}
                    </p>
                    <p className="flex h-[30px] items-center justify-center border-b pl-1 font-[AvenirLTProMedium] text-[11px]">
                      {seledtedProducts?.numberOfBottlesIn1M3}
                    </p>
                  </div>
                  <div className="col-span-2 flex" dir="ltr">
                    <div className="grid grid-cols-3">
                      <p className="flex items-center justify-center border-r border-b bg-black/20 py-1 pl-1 text-center text-[13px]">
                        loaded pallet
                      </p>
                      <p className="col-span-2 flex flex-col border-b">
                        <span className="flex h-[30px] items-center bg-black/20 px-1 text-[12px]">
                          Dimension
                        </span>
                        <span className="flex h-[30px] items-center bg-black/20 px-1 text-[12px]">
                          Volume
                        </span>
                        <span className="flex h-[30px] items-center bg-black/20 px-1 text-[12px]">
                          Total weight
                        </span>
                        <span className="flex h-[31px] items-center bg-black/20 px-1 text-[12px]">
                          Weight of bottles
                        </span>
                        <span className="flex h-[31px] items-center bg-black/20 px-1 text-[11px]">
                          Weight of packing
                        </span>
                      </p>
                      <p className="col-span-3 flex h-[30px] items-center border-b bg-black/20 pl-1 font-[AvenirLTProMedium] text-[12px]">
                        Number of bottles in 1 ton
                      </p>
                      <p className="col-span-3 flex h-[30px] items-center border-b bg-black/20 pl-1 font-[AvenirLTProMedium] text-[12px]">
                        Number of bottles in 1 m3
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b bg-black/20 py-1 text-center font-[SamimBold]">
                REQUIRED PACKAGING MATERIALS FOR A PALLET
              </div>
              {/* Line 1 */}
              <div className="flex">
                {/* UNIT */}
                <div className="w-[100px]">
                  <p className="flex items-center justify-center border-b bg-black/20 py-1 font-[SamimBold] text-[13px]">
                    UNIT
                  </p>
                  <p className="flex h-14 items-center justify-center border-b">
                    {seledtedProducts?.packagingMaterials[0]?.unit}
                  </p>
                </div>
                {/* QUANTITY */}
                <div className="w-[75px]">
                  <p className="flex items-center justify-center border-r border-b bg-black/20 py-1 font-[SamimBold] text-[13px]">
                    QUANTITY
                  </p>
                  <p className="flex h-14 items-center justify-center border-r border-b font-[AvenirLTProMedium]">
                    {seledtedProducts?.packagingMaterials[0]?.quantity}
                  </p>
                </div>
                {/* DIMENSIONS */}
                <div className="w-40">
                  <p className="flex items-center justify-center border-r border-b bg-black/20 py-1 font-[SamimBold] text-[13px]">
                    DIMENSIONS
                  </p>
                  <p
                    dir="ltr"
                    className="flex h-14 items-center justify-center border-r border-b pl-1 font-[AvenirLTProMedium] text-[13px]"
                  >
                    {seledtedProducts?.packagingMaterials[0]?.dimensions}
                  </p>
                </div>
                {/* QUALITY */}
                <div className="w-[310px]">
                  <p className="flex items-center justify-center border-r border-b bg-black/20 py-1 font-[SamimBold] text-[13px]">
                    QUALITY
                  </p>
                  <div
                    className="flex h-14 flex-col space-y-1 border-r border-b py-0.5 pl-1"
                    dir="ltr"
                  >
                    <p className="space-x-1">
                      <span>TYPE :</span>
                      <span>
                        {seledtedProducts?.packagingMaterials[0]?.materialType}
                      </span>
                    </p>
                    <p>
                      <span>
                        {seledtedProducts?.packagingMaterials[0]?.quality}
                      </span>
                    </p>
                  </div>
                </div>
                {/* MATERIAL */}

                <div className="w-[200px] text-center">
                  <p className="border-r border-b bg-black/20 py-1 font-[SamimBold] text-[13px]">
                    MATERIAL
                  </p>

                  <p className="h-14 border-r border-b py-4 pl-1 text-left">
                    {seledtedProducts?.packagingMaterials[0]?.materialName}
                  </p>
                </div>
              </div>
              {/* line 2 */}
              <div className="flex h-8 text-left">
                <p className="flex w-[100px] items-center justify-center border-b">
                  {seledtedProducts?.packagingMaterials[1]?.unit}
                </p>
                <p className="flex w-[75px] items-center justify-center border-r border-b font-[AvenirLTProMedium]">
                  {seledtedProducts?.packagingMaterials[1]?.quantity}
                </p>
                <p
                  dir="ltr"
                  className="flex w-40 items-center justify-center border-r border-b pl-1 font-[AvenirLTProMedium] text-[13px]"
                >
                  {seledtedProducts?.packagingMaterials[1]?.dimensions}
                </p>
                <p
                  className="flex w-[310px] items-center border-r border-b pl-1 font-[AvenirLTProMedium]"
                  dir="ltr"
                >
                  {seledtedProducts?.packagingMaterials[1]?.materialType}
                </p>
                <p className="flex w-[200px] items-center justify-end border-r border-b pl-1">
                  {seledtedProducts?.packagingMaterials[1]?.materialName}
                </p>
              </div>
              {/* Line 3 */}
              <div className="flex h-8 text-left">
                <p className="flex w-[100px] items-center justify-center border-b">
                  {seledtedProducts?.packagingMaterials[2]?.unit}
                </p>
                <p className="flex w-[75px] items-center justify-center border-r border-b font-[AvenirLTProMedium]">
                  {seledtedProducts?.packagingMaterials[2]?.quantity}
                </p>
                <p
                  dir="ltr"
                  className="flex w-40 items-center justify-center border-r border-b pl-1 font-[AvenirLTProMedium] text-[13px]"
                >
                  {seledtedProducts?.packagingMaterials[2]?.dimensions}
                </p>
                <p className="flex w-[310px] items-center justify-end border-r border-b pl-1 font-[AvenirLTProMedium] text-[13px]">
                  {seledtedProducts?.packagingMaterials[2]?.materialType}
                </p>
                <p className="flex w-[200px] items-center justify-end border-r border-b pl-1">
                  {seledtedProducts?.packagingMaterials[2]?.materialName}
                </p>
              </div>
              {/* Line 4 */}
              <div className="flex h-8 text-left">
                <p className="flex w-[100px] items-center justify-center border-b">
                  {seledtedProducts?.packagingMaterials[3]?.unit}
                </p>
                <p className="flex w-[75px] items-center justify-center border-r border-b font-[AvenirLTProMedium]">
                  {seledtedProducts?.packagingMaterials[3]?.quantity}
                </p>
                <p
                  dir="ltr"
                  className="flex w-40 items-center justify-center border-r border-b pl-1 font-[AvenirLTProMedium] text-[13px]"
                >
                  {seledtedProducts?.packagingMaterials[3]?.dimensions}
                </p>
                <p className="flex w-[310px] items-center justify-end border-r border-b pl-1 font-[AvenirLTProMedium] text-[13px]">
                  {seledtedProducts?.packagingMaterials[3]?.materialType}
                </p>
                <p className="flex w-[200px] items-center justify-end border-r border-b pl-1">
                  {seledtedProducts?.packagingMaterials[3]?.materialName}
                </p>
              </div>
              {/* Line 5 */}
              <div className="flex h-14 text-left">
                <p className="flex w-[100px] flex-col items-center justify-between border-b">
                  <span className="flex w-full items-center justify-center border-b">
                    {seledtedProducts?.packagingMaterials[4]?.unit || ''}
                  </span>
                  <span className="m-auto flex w-full items-center justify-center"></span>
                </p>
                <p className="flex w-[75px] flex-col items-center justify-between border-r border-b font-[AvenirLTProMedium]">
                  <span className="flex w-full items-center justify-center border-b">
                    {seledtedProducts?.packagingMaterials[4]?.quantity || ''}
                  </span>
                  <span className="m-auto flex w-full items-center justify-center"></span>
                </p>
                <p
                  className="flex w-40 flex-col items-center justify-center border-r border-b font-[AvenirLTProMedium] text-[13px]"
                  dir="ltr"
                >
                  <span className="m-auto flex w-full items-center justify-center border-b">
                    {seledtedProducts?.packagingMaterials[4]?.dimensions || ''}
                  </span>
                  <span className="m-auto flex w-full items-center justify-center"></span>
                </p>

                <p className="flex w-[310px] flex-col items-center justify-end border-r border-b font-[AvenirLTProMedium] text-[13px]">
                  <span className="m-auto flex w-full items-center justify-end border-b pl-1">
                    {seledtedProducts?.packagingMaterials[4]?.materialType ||
                      ''}
                  </span>
                  <span className="m-auto flex w-full items-center justify-end pl-1"></span>
                </p>
                <p className="flex w-[199px] items-center justify-end border-r border-b pl-1">
                  {seledtedProducts?.packagingMaterials[4]?.materialName || ''}
                </p>
              </div>
              {/* Line 6 */}
              <div className="flex h-10 text-left">
                <p className="flex w-[100px] items-center justify-center border-b">
                  {seledtedProducts?.packagingMaterials[5]?.unit || ''}
                </p>
                <p className="flex w-[75px] items-center justify-center border-r border-b font-[AvenirLTProMedium]">
                  {seledtedProducts?.packagingMaterials[5]?.quantity || ''}
                </p>
                <p
                  className="flex w-40 items-center justify-center border-r border-b font-[AvenirLTProMedium] text-[13px]"
                  dir="ltr"
                >
                  {seledtedProducts?.packagingMaterials[5]?.dimensions || ''}
                </p>
                <p className="flex w-[310px] items-center justify-end border-r border-b pl-1 font-[AvenirLTProMedium] text-[13px]">
                  {seledtedProducts?.packagingMaterials[5]?.materialType || ''}
                </p>
                <p className="flex w-[199px] items-center justify-end border-r border-b pl-1 text-[13px]">
                  {seledtedProducts?.packagingMaterials[5]?.materialName || ''}
                </p>
              </div>
              {/* Line 7 */}
              <div className="flex h-8 text-left">
                <p className="flex w-[100px] items-center justify-center border-b">
                  {seledtedProducts?.packagingMaterials[6]?.unit || ''}
                </p>
                <p className="flex w-[75px] items-center justify-center border-r border-b font-[AvenirLTProMedium]">
                  {seledtedProducts?.packagingMaterials[6]?.quantity || ''}
                </p>
                <p
                  className="flex w-40 items-center justify-center border-r border-b font-[AvenirLTProMedium] text-[13px]"
                  dir="ltr"
                >
                  {seledtedProducts?.packagingMaterials[6]?.dimensions || ''}
                </p>
                <p className="flex w-[310px] items-center justify-end border-r border-b pl-1 font-[AvenirLTProMedium]">
                  {seledtedProducts?.packagingMaterials[6]?.materialType || ''}
                </p>
                <p className="flex w-[199px] items-center justify-end border-r border-b pl-1 text-[13px]">
                  {seledtedProducts?.packagingMaterials[6]?.materialName || ''}
                </p>
              </div>
              {/* Line 8 */}
              <div className="flex h-8 text-left">
                <p className="flex w-[100px] items-center justify-center border-b">
                  {seledtedProducts?.packagingMaterials[7]?.unit || ''}
                </p>
                <p className="flex w-[75px] items-center justify-center border-r border-b font-[AvenirLTProMedium]">
                  {seledtedProducts?.packagingMaterials[7]?.quantity || ''}
                </p>
                <p
                  className="flex w-40 items-center justify-center border-r border-b font-[AvenirLTProMedium] text-[13px]"
                  dir="ltr"
                >
                  {seledtedProducts?.packagingMaterials[7]?.dimensions || ''}
                </p>
                <p className="flex w-[310px] items-center justify-end border-r border-b pl-1 font-[AvenirLTProMedium]">
                  {seledtedProducts?.packagingMaterials[7]?.materialType || ''}
                </p>
                <p className="flex w-[199px] items-center justify-end border-r border-b pl-1 text-[13px]">
                  {seledtedProducts?.packagingMaterials[7]?.materialName || ''}
                </p>
              </div>
              {/* Line 9 */}
              <div className="flex h-8 text-left">
                <p className="flex w-[100px] items-center justify-center border-b">
                  {seledtedProducts?.packagingMaterials[8]?.unit || ''}
                </p>
                <p className="flex w-[75px] items-center justify-center border-r border-b font-[AvenirLTProMedium]">
                  {seledtedProducts?.packagingMaterials[8]?.quantity || ''}
                </p>
                <p
                  className="flex w-40 items-center justify-center border-r border-b font-[AvenirLTProMedium] text-[13px]"
                  dir="ltr"
                >
                  {seledtedProducts?.packagingMaterials[8]?.dimensions || ''}
                </p>
                <p className="flex w-[310px] items-center justify-end border-r border-b pl-1 font-[AvenirLTProMedium]">
                  {seledtedProducts?.packagingMaterials[8]?.materialType || ''}
                </p>
                <p className="flex w-[199px] items-center justify-end border-r border-b pl-1 text-[13px]">
                  {seledtedProducts?.packagingMaterials[8]?.materialName || ''}
                </p>
              </div>
              <div className="flex h-7">
                <p className="flex w-[94px] items-center justify-center border-b bg-black/20 font-[SamimBold] text-[12px]">
                  Customer
                </p>
                <p className="flex w-[220px] items-center justify-center border-r border-b bg-black/20 font-[SamimBold] text-[12px]">
                  Manufacturer
                </p>
                <p className="flex w-[130px] items-center justify-center border-r border-b bg-black/20 font-[SamimBold] text-[12px]">
                  APPROVED BY
                </p>
                <p
                  dir="ltr"
                  className="flex w-[348px] items-center justify-center border-r border-b bg-black/20 font-[SamimBold] text-[12px]"
                >
                  PREPARD BY
                </p>
              </div>
              <div className="flex">
                <div className="w-[94px]">
                  <p className="flex h-8 items-center justify-center border-b"></p>
                  <p className="flex h-17 items-center justify-center"></p>
                </div>
                {/* Manufacturer */}
                <div className="w-[220px] border-r">
                  <p className="flex h-8 items-center justify-center border-b"></p>
                  <p className="flex h-17 items-center justify-center"></p>
                </div>
                {/* APPROVED BY */}
                <div className="w-[130px] border-r">
                  <p className="flex h-8 items-center justify-center border-b">
                    Date
                  </p>
                  <p className="flex h-17 items-center justify-center">
                    Signature
                  </p>
                </div>
                {/* PREPARD BY */}
                <div className="flex h-25 w-[348px] justify-end border-r text-left">
                  <div className="w-[80%]">
                    <p className="flex h-8 items-center justify-center border-b">
                      {seledtedProducts?.preparedBy}
                    </p>
                    <p className="flex h-9 items-center justify-center border-b font-[AvenirLTProMedium]">
                      {seledtedProducts?.revisionNumber}
                    </p>
                    <p className="flex h-8 items-center justify-center font-[AvenirLTProMedium]">
                      {toShamsi(seledtedProducts?.updatedAt)}
                    </p>
                  </div>
                  <div className="w-[20%] border-r">
                    <p className="flex h-8 items-center justify-end border-b px-1">
                      Name
                    </p>
                    <p className="flex h-9 items-center justify-end border-b px-1">
                      Rev
                    </p>
                    <p className="flex h-8 items-center justify-end px-1">
                      Date
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormProducts;
