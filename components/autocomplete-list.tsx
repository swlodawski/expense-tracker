import { useEffect, useRef } from "node_modules/@types/react";

import { Transition } from '@headlessui/react';

import { Button } from './ui/button';

type AutoCompleteListProps = {
    searchTerm?: string;
    show: boolean;
    onHide: () => void;
    data: any[];
    onClick: (datum: any) => void;
};

