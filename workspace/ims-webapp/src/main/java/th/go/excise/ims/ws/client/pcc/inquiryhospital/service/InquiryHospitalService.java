package th.go.excise.ims.ws.client.pcc.inquiryhospital.service;

import java.lang.reflect.Type;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import th.go.excise.ims.ws.client.pcc.common.PccServiceProperties;
import th.go.excise.ims.ws.client.pcc.common.exception.PccRestfulException;
import th.go.excise.ims.ws.client.pcc.common.model.PccResponseHeader;
import th.go.excise.ims.ws.client.pcc.common.service.AbstractPccRestfulService;
import th.go.excise.ims.ws.client.pcc.inquiryhospital.model.Hospital;
import th.go.excise.ims.ws.client.service.RestfulClientService;

@Service
public class InquiryHospitalService extends AbstractPccRestfulService<Object, List<Hospital>> {
	
	@Autowired
	public InquiryHospitalService(
			@Value("${ws.excise.endpoint.rdb.inquiry-hospital}") String url,
			PccServiceProperties pccServicePrpperties,
			RestfulClientService restfulClientService,
			Gson gson) {
		super.url = url;
		super.pccServicePrpperties = pccServicePrpperties;
		super.restfulClientService = restfulClientService;
		super.gson = gson;
	}

	@Override
	public List<Hospital> execute(Object requestData) throws PccRestfulException {
		return executePost(requestData);
	}

	@Override
	protected Type getResponseDataType() {
		return new TypeToken<PccResponseHeader<List<Hospital>>>(){}.getType();
	}
	
}
