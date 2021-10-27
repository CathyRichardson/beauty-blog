import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "./App";
import AdminEditProduct from "./Components/AdminEditProduct";
import Haircare from "./Components/Haircare";
import Home from "./Components/Home";
import Makeup from "./Components/Makeup";
import SkincareProduct from "./Components/SkincareProduct";
import SkincareProductsList from "./Components/SkincareProductsList";


export default (
    <Switch>
        <Route path='/beauty/skincare/admin' component={AdminEditProduct} />
        <Route path='/beauty/skincare/reviews' component={SkincareProduct} />
        <Route path='/beauty/skincare' component={SkincareProductsList} />
        <Route path='/beauty/haircare' component={Haircare} />
        <Route path='/beauty/makeup' component={Makeup} />
        <Route path='/beauty' component={Home} />
        <Route path='/' component={Home} />
    </Switch>
)